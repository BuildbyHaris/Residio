import { getIO } from "./socket.server.js";

/**
 * =========================================================
 * GET CONVERSATION ROOM
 * =========================================================
 */
const getConversationRoom = (
  conversationId
) => {
  return `conversation:${conversationId}`;
};

/**
 * =========================================================
 * EMIT NEW MESSAGE
 * =========================================================
 */
export const emitNewMessage = ({
  conversationId,
  message,
}) => {
  const io = getIO();

  const room =
    getConversationRoom(
      conversationId
    );

  io.to(room).emit(
    "new_message",
    {
      success: true,
      message,
    }
  );
};

/**
 * =========================================================
 * EMIT MESSAGE DELIVERED
 * =========================================================
 */
export const emitMessageDelivered = ({
  conversationId,
  messageIds,
}) => {
  const io = getIO();

  const room =
    getConversationRoom(
      conversationId
    );

  io.to(room).emit(
    "message_delivered",
    {
      success: true,
      conversationId,
      messageIds,
    }
  );
};

/**
 * =========================================================
 * EMIT MESSAGE READ
 * =========================================================
 */
export const emitMessageRead = ({
  conversationId,
  messageIds,
}) => {
  const io = getIO();

  const room =
    getConversationRoom(
      conversationId
    );

  io.to(room).emit(
    "message_read",
    {
      success: true,
      conversationId,
      messageIds,
    }
  );
};

/**
 * =========================================================
 * EMIT MESSAGE DELETED
 * =========================================================
 */
export const emitMessageDeleted = ({
  conversationId,
  messageId,
  deletedAt,
}) => {
  const io = getIO();

  const room =
    getConversationRoom(
      conversationId
    );

  io.to(room).emit(
    "message_deleted",
    {
      success: true,
      conversationId,
      messageId,
      deletedAt,
    }
  );
};