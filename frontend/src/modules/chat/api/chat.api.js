import api from "../../../services/api";

/**
 * =========================================================
 * CREATE OR GET PROPERTY CONVERSATION
 * =========================================================
 *
 * POST /api/v1/chat/conversations
 *
 * Body:
 * {
 *   hostelId
 * }
 *
 * Used when a user wants to chat about a hostel/property.
 */
export const createOrGetPropertyConversationApi = async (data) => {
  try {
    console.log("Sending chat request:", data);

    const response = await api.post(
      "/chat/conversations",
      data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Chat API Error:",
      error.response?.data
    );

    throw error;
  }
};

/**
 * =========================================================
 * GET SINGLE CONVERSATION
 * =========================================================
 *
 * GET /api/v1/chat/conversations/:conversationId
 */
export const getConversationByIdApi =
  async (conversationId) => {
    const response = await api.get(
      `/chat/conversations/${conversationId}`
    );

    return response.data;
  };

/**
 * =========================================================
 * SEND MESSAGE
 * =========================================================
 *
 * POST /api/v1/chat/messages
 */
export const sendMessageApi = async (
  data
) => {
  const response = await api.post(
    "/chat/messages",
    data
  );

  return response.data;
};

/**
 * =========================================================
 * GET CONVERSATION MESSAGES
 * =========================================================
 *
 * GET /api/v1/chat/conversations/:conversationId/messages
 */
export const getConversationMessagesApi =
  async (conversationId) => {
    const response = await api.get(
      `/chat/conversations/${conversationId}/messages`
    );

    return response.data;
  };

/**
 * =========================================================
 * MARK MESSAGES AS DELIVERED
 * =========================================================
 *
 * PATCH /api/v1/chat/conversations/:conversationId/messages/delivered
 */
export const markMessagesAsDeliveredApi =
  async (conversationId) => {
    const response = await api.patch(
      `/chat/conversations/${conversationId}/messages/delivered`
    );

    return response.data;
  };

/**
 * =========================================================
 * MARK MESSAGES AS READ
 * =========================================================
 *
 * PATCH /api/v1/chat/conversations/:conversationId/messages/read
 */
export const markMessagesAsReadApi =
  async (conversationId) => {
    const response = await api.patch(
      `/chat/conversations/${conversationId}/messages/read`
    );

    return response.data;
  };

/**
 * =========================================================
 * DELETE MESSAGE
 * =========================================================
 *
 * DELETE /api/v1/chat/conversations/:conversationId/messages/:messageId
 */
export const deleteMessageApi = async (
  conversationId,
  messageId
) => {
  const response = await api.delete(
    `/chat/conversations/${conversationId}/messages/${messageId}`
  );

  return response.data;
};