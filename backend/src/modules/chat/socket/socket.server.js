import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import User from "../../auth/models/User.js";
import Conversation from "../models/Conversation.js";
import { env } from "../../../config/env.js";

let io;

/**
 * =========================================================
 * SOCKET.IO INITIALIZATION
 * =========================================================
 */
export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: env.frontendUrl,
      credentials: true,
    },
  });

  /**
   * =======================================================
   * SOCKET AUTHENTICATION MIDDLEWARE
   * =======================================================
   *
   * Every socket connection must be authenticated.
   *
   * The access token is expected to be available through
   * the HTTP cookie sent by the client.
   */
  io.use(async (socket, next) => {
    try {
      /**
       * -----------------------------------------------
       * 1. Read cookies from handshake headers
       * -----------------------------------------------
       */
      const cookieHeader =
        socket.handshake.headers.cookie;

      if (!cookieHeader) {
        return next(
          new Error("Authentication required")
        );
      }

      /**
       * -----------------------------------------------
       * 2. Parse accessToken cookie
       * -----------------------------------------------
       */
      const cookies = Object.fromEntries(
        cookieHeader
          .split(";")
          .map((cookie) => {
            const [key, ...value] =
              cookie.trim().split("=");

            return [
              key,
              decodeURIComponent(value.join("=")),
            ];
          })
      );

      const token = cookies.accessToken;

      if (!token) {
        return next(
          new Error("Authentication required")
        );
      }

      /**
       * -----------------------------------------------
       * 3. Verify JWT
       * -----------------------------------------------
       */
      const decoded = jwt.verify(
        token,
        env.jwtSecret
      );

      if (!decoded?.id) {
        return next(
          new Error("Invalid authentication token")
        );
      }

      /**
       * -----------------------------------------------
       * 4. Find authenticated user
       * -----------------------------------------------
       */
      const user = await User.findById(
        decoded.id
      ).select(
        "_id name email role profileImage"
      );

      if (!user) {
        return next(
          new Error("User not found")
        );
      }

      /**
       * -----------------------------------------------
       * 5. Attach user to socket
       * -----------------------------------------------
       *
       * This is trusted server-side data.
       */
      socket.user = user;

      /**
       * -----------------------------------------------
       * 6. Continue connection
       * -----------------------------------------------
       */
      next();
    } catch (error) {
      console.error(
        "Socket authentication failed:",
        error.message
      );

      return next(
        new Error("Invalid or expired session")
      );
    }
  });

  /**
   * =======================================================
   * SOCKET CONNECTION
   * =======================================================
   */
  io.on("connection", (socket) => {
    const userId =
      socket.user._id.toString();

    console.log(
      `🔌 Socket connected: ${userId}`
    );

    /**
     * ---------------------------------------------------
     * JOIN CONVERSATION
     * ---------------------------------------------------
     */
    socket.on(
      "join_conversation",
      async ({ conversationId }) => {
        try {
          /**
           * ---------------------------------------------
           * 1. Validate conversation ID
           * ---------------------------------------------
           */
          if (
            !conversationId ||
            !/^[a-fA-F0-9]{24}$/.test(
              conversationId
            )
          ) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "Invalid conversation ID",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 2. Find conversation
           * ---------------------------------------------
           */
          const conversation =
            await Conversation.findById(
              conversationId
            ).select(
              "_id participants status"
            );

          if (!conversation) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "Conversation not found",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 3. Verify participant
           * ---------------------------------------------
           */
          const isParticipant =
            conversation.participants.some(
              (participantId) =>
                participantId.toString() ===
                userId
            );

          if (!isParticipant) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "You are not a participant in this conversation",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 4. Verify conversation status
           * ---------------------------------------------
           */
          if (
            conversation.status !== "active"
          ) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "This conversation is not active",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 5. Join conversation room
           * ---------------------------------------------
           */
          const roomName =
            `conversation:${conversationId}`;

          await socket.join(roomName);

          console.log(
            `👥 ${userId} joined ${roomName}`
          );

          /**
           * ---------------------------------------------
           * 6. Confirm successful join
           * ---------------------------------------------
           */
          socket.emit(
            "conversation_joined",
            {
              success: true,
              conversationId,
            }
          );
        } catch (error) {
          console.error(
            "Join conversation error:",
            error
          );

          socket.emit(
            "socket_error",
            {
              success: false,
              message:
                "Unable to join conversation",
            }
          );
        }
      }
    );

    /**
     * ---------------------------------------------------
     * LEAVE CONVERSATION
     * ---------------------------------------------------
     */
    socket.on(
      "leave_conversation",
      async ({ conversationId }) => {
        try {
          if (
            !conversationId ||
            !/^[a-fA-F0-9]{24}$/.test(
              conversationId
            )
          ) {
            return;
          }

          const roomName =
            `conversation:${conversationId}`;

          await socket.leave(roomName);

          console.log(
            `👋 ${userId} left ${roomName}`
          );
        } catch (error) {
          console.error(
            "Leave conversation error:",
            error.message
          );
        }
      }
    );

    /**
     * ===================================================
     * START TYPING
     * ===================================================
     *
     * Frontend emits:
     *
     * socket.emit("typing_start", {
     *   conversationId
     * });
     *
     * The server verifies that the socket user has
     * actually joined the conversation room.
     *
     * The event is broadcast to the other participant
     * only.
     *
     * Nothing is saved in MongoDB.
     */
    socket.on(
      "typing_start",
      async ({ conversationId }) => {
        try {
          /**
           * ---------------------------------------------
           * 1. Validate conversation ID
           * ---------------------------------------------
           */
          if (
            !conversationId ||
            !/^[a-fA-F0-9]{24}$/.test(
              conversationId
            )
          ) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "Invalid conversation ID",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 2. Verify socket is inside conversation room
           * ---------------------------------------------
           */
          const roomName =
            `conversation:${conversationId}`;

          if (
            !socket.rooms.has(roomName)
          ) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "You must join the conversation first",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 3. Verify conversation still exists
           * ---------------------------------------------
           */
          const conversation =
            await Conversation.findOne({
              _id: conversationId,
              participants: socket.user._id,
              status: "active",
            }).select("_id");

          if (!conversation) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "Conversation not found or access denied",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 4. Notify other participant
           * ---------------------------------------------
           */
          socket.to(roomName).emit(
            "user_typing",
            {
              success: true,
              conversationId,
              userId:
                socket.user._id.toString(),
            }
          );
        } catch (error) {
          console.error(
            "Typing start error:",
            error.message
          );
        }
      }
    );

    /**
     * ===================================================
     * STOP TYPING
     * ===================================================
     *
     * Frontend emits:
     *
     * socket.emit("typing_stop", {
     *   conversationId
     * });
     */
    socket.on(
      "typing_stop",
      async ({ conversationId }) => {
        try {
          /**
           * ---------------------------------------------
           * 1. Validate conversation ID
           * ---------------------------------------------
           */
          if (
            !conversationId ||
            !/^[a-fA-F0-9]{24}$/.test(
              conversationId
            )
          ) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "Invalid conversation ID",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 2. Verify socket is inside conversation room
           * ---------------------------------------------
           */
          const roomName =
            `conversation:${conversationId}`;

          if (
            !socket.rooms.has(roomName)
          ) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "You must join the conversation first",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 3. Verify conversation still exists
           * ---------------------------------------------
           */
          const conversation =
            await Conversation.findOne({
              _id: conversationId,
              participants: socket.user._id,
              status: "active",
            }).select("_id");

          if (!conversation) {
            return socket.emit(
              "socket_error",
              {
                success: false,
                message:
                  "Conversation not found or access denied",
              }
            );
          }

          /**
           * ---------------------------------------------
           * 4. Notify other participant
           * ---------------------------------------------
           */
          socket.to(roomName).emit(
            "user_stopped_typing",
            {
              success: true,
              conversationId,
              userId:
                socket.user._id.toString(),
            }
          );
        } catch (error) {
          console.error(
            "Typing stop error:",
            error.message
          );
        }
      }
    );

    /**
     * ---------------------------------------------------
     * DISCONNECT
     * ---------------------------------------------------
     */
    socket.on(
      "disconnect",
      (reason) => {
        console.log(
          `🔌 Socket disconnected: ${userId}`,
          reason
        );
      }
    );
  });

  console.log(
    "🔌 Socket.IO initialized"
  );

  return io;
};

/**
 * =========================================================
 * GET SOCKET.IO INSTANCE
 * =========================================================
 */
export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized"
    );
  }

  return io;
};