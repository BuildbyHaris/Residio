import socket from "./socket.js";

/**
 * =========================================================
 * CONVERSATION JOINED
 * =========================================================
 */
export const onConversationJoined = (
  callback
) => {
  socket.on(
    "conversation_joined",
    callback
  );
};

/**
 * =========================================================
 * SOCKET ERROR
 * =========================================================
 */
export const onSocketError = (
  callback
) => {
  socket.on(
    "socket_error",
    callback
  );
};

/**
 * =========================================================
 * USER TYPING
 * =========================================================
 */
export const onUserTyping = (
  callback
) => {
  socket.on(
    "user_typing",
    callback
  );
};

/**
 * =========================================================
 * USER STOPPED TYPING
 * =========================================================
 */
export const onUserStoppedTyping = (
  callback
) => {
  socket.on(
    "user_stopped_typing",
    callback
  );
};

/**
 * =========================================================
 * REMOVE LISTENERS
 * =========================================================
 */
export const removeChatSocketListeners = () => {
  socket.off(
    "conversation_joined"
  );

  socket.off(
    "socket_error"
  );

  socket.off(
    "user_typing"
  );

  socket.off(
    "user_stopped_typing"
  );
};