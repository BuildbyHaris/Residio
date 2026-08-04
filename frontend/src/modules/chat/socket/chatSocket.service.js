import socket from "./socket.js";

/**
 * =========================================================
 * JOIN CONVERSATION
 * =========================================================
 */
export const joinConversation = (
  conversationId
) => {
  if (!conversationId) {
    console.error(
      "❌ Conversation ID is required"
    );

    return;
  }

  socket.emit(
    "join_conversation",
    {
      conversationId,
    }
  );
};

/**
 * =========================================================
 * LEAVE CONVERSATION
 * =========================================================
 */
export const leaveConversation = (
  conversationId
) => {
  if (!conversationId) {
    return;
  }

  socket.emit(
    "leave_conversation",
    {
      conversationId,
    }
  );
};

/**
 * =========================================================
 * START TYPING
 * =========================================================
 */
export const startTyping = (
  conversationId
) => {
  if (!conversationId) {
    return;
  }

  socket.emit(
    "typing_start",
    {
      conversationId,
    }
  );
};

/**
 * =========================================================
 * STOP TYPING
 * =========================================================
 */
export const stopTyping = (
  conversationId
) => {
  if (!conversationId) {
    return;
  }

  socket.emit(
    "typing_stop",
    {
      conversationId,
    }
  );
};