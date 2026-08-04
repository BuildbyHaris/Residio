import {
  sendMessage,
  getConversationMessages,
  markMessagesAsDelivered,
  markMessagesAsRead,
  deleteMessage,
} from "../services/message.service.js";

/**
 * =========================================================
 * SEND MESSAGE
 * =========================================================
 */
export const sendMessageController = async (
  req,
  res,
  next
) => {
  try {
    const {
      conversationId,
      messageType,
      content,
      clientMessageId,
    } = req.body;

    const result = await sendMessage({
      conversationId,
      senderId: req.user._id,
      messageType,
      content,
      clientMessageId,
    });

    return res.status(
      result.duplicate ? 200 : 201
    ).json({
      success: true,
      message: result.duplicate
        ? "Message already exists"
        : "Message sent successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =========================================================
 * GET CONVERSATION MESSAGES
 * =========================================================
 */
export const getConversationMessagesController =
  async (req, res, next) => {
    try {
      const {
        conversationId,
      } = req.params;

      const {
        limit,
        before,
      } = req.query;

      const result =
        await getConversationMessages({
          conversationId,
          userId: req.user._id,
          limit,
          before,
        });

      return res.status(200).json({
        success: true,
        message:
          "Messages retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * =========================================================
 * MARK AS DELIVERED
 * =========================================================
 */
export const markMessagesAsDeliveredController =
  async (req, res, next) => {
    try {
      const {
        conversationId,
      } = req.params;

      const result =
        await markMessagesAsDelivered({
          conversationId,
          userId: req.user._id,
        });

      return res.status(200).json({
        success: true,
        message:
          "Messages marked as delivered",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * =========================================================
 * MARK AS READ
 * =========================================================
 */
export const markMessagesAsReadController =
  async (req, res, next) => {
    try {
      const {
        conversationId,
      } = req.params;

      const result =
        await markMessagesAsRead({
          conversationId,
          userId: req.user._id,
        });

      return res.status(200).json({
        success: true,
        message:
          "Messages marked as read",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  export const deleteMessageController = async (
  req,
  res,
  next
) => {
  try {
    const {
      conversationId,
      messageId,
    } = req.params;

    const result = await deleteMessage({
      conversationId,
      messageId,
      userId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};