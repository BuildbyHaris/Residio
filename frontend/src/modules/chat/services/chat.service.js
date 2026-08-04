
import {
  createOrGetPropertyConversationApi,
  getConversationByIdApi,
  sendMessageApi,
  getConversationMessagesApi,
  markMessagesAsDeliveredApi,
  markMessagesAsReadApi,
  deleteMessageApi,
} from "../api/chat.api";

/**
 * =========================================================
 * CREATE OR GET PROPERTY CONVERSATION
 * =========================================================
 *
 * POST /api/v1/chat/conversations
 *
 * Backend expects:
 * {
 *   hostelId: "..."
 * }
 */
export const createOrGetPropertyConversation = async (
  hostelId
) => {
  console.log(
    "Creating conversation with hostelId:",
    hostelId
  );

  if (!hostelId) {
    throw new Error(
      "Hostel ID is required to create conversation"
    );
  }

  return await createOrGetPropertyConversationApi({
    hostelId,
  });
};

/**
 * =========================================================
 * GET SINGLE CONVERSATION
 * =========================================================
 *
 * GET /api/v1/chat/conversations/:conversationId
 */
export const getConversationById = async (
  conversationId
) => {
  if (!conversationId) {
    throw new Error(
      "Conversation ID is required"
    );
  }

  return await getConversationByIdApi(
    conversationId
  );
};


/**
 * =========================================================
 * SEND MESSAGE
 * =========================================================
 *
 * POST /api/v1/chat/messages
 *
 * Expected data:
 * {
 *   conversationId,
 *   content,
 *   clientMessageId
 * }
 */
export const sendMessage = async (
  data
) => {
  if (!data?.conversationId) {
    throw new Error(
      "Conversation ID is required"
    );
  }

  if (!data?.content?.trim()) {
    throw new Error(
      "Message content is required"
    );
  }

  if (!data?.clientMessageId) {
    throw new Error(
      "Client message ID is required"
    );
  }

  return await sendMessageApi({
    conversationId:
      data.conversationId,

    content:
      data.content.trim(),

    clientMessageId:
      data.clientMessageId,
  });
};



/**
 * =========================================================
 * GET CONVERSATION MESSAGES
 * =========================================================
 *
 * GET /api/v1/chat/conversations/:conversationId/messages
 */
export const getConversationMessages =
  async (conversationId) => {
    if (!conversationId) {
      throw new Error(
        "Conversation ID is required"
      );
    }

    return await getConversationMessagesApi(
      conversationId
    );
  };

/**
 * =========================================================
 * MARK MESSAGES AS DELIVERED
 * =========================================================
 *
 * PATCH /api/v1/chat/conversations/:conversationId/messages/delivered
 */
export const markMessagesAsDelivered =
  async (conversationId) => {
    if (!conversationId) {
      throw new Error(
        "Conversation ID is required"
      );
    }

    return await markMessagesAsDeliveredApi(
      conversationId
    );
  };

/**
 * =========================================================
 * MARK MESSAGES AS READ
 * =========================================================
 *
 * PATCH /api/v1/chat/conversations/:conversationId/messages/read
 */
export const markMessagesAsRead =
  async (conversationId) => {
    if (!conversationId) {
      throw new Error(
        "Conversation ID is required"
      );
    }

    return await markMessagesAsReadApi(
      conversationId
    );
  };

/**
 * =========================================================
 * DELETE MESSAGE
 * =========================================================
 *
 * DELETE /api/v1/chat/conversations/:conversationId/messages/:messageId
 */
export const deleteMessage = async (
  conversationId,
  messageId
) => {
  if (!conversationId) {
    throw new Error(
      "Conversation ID is required"
    );
  }

  if (!messageId) {
    throw new Error(
      "Message ID is required"
    );
  }

  return await deleteMessageApi(
    conversationId,
    messageId
  );
};

