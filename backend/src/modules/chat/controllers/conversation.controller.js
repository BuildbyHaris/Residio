  import {
    createOrGetPropertyConversation,
    getUserConversations,
    getConversationById,
  } from "../services/conversation.service.js";

  /**
   * Create or get a property inquiry conversation.
   *
   * POST /api/v1/chat/conversations
   */
  export const createOrGetPropertyConversationController =
    async (req, res, next) => {
      try {
        const { hostelId } = req.body;

        const userId = req.user._id;

        const result =
          await createOrGetPropertyConversation({
            userId,
            hostelId,
          });

        return res.status(
          result.created ? 201 : 200
        ).json({
          success: true,

          message: result.created
            ? "Conversation created successfully"
            : "Conversation retrieved successfully",

          data: {
            conversation: result.conversation,

            created: result.created,
          },
        });
      } catch (error) {
        next(error);
      }
    };

    // ============================================================
  // GET USER CONVERSATIONS
  // ============================================================

  export const getUserConversationsController = async (
    req,
    res,
    next
  ) => {
    try {
      const {
        cursor = null,
        limit = 20,
      } = req.query;

      const result =
        await getUserConversations({
          userId: req.user._id,
          cursor,
          limit,
        });

      return res.status(200).json({
        success: true,
        message:
          "Conversations retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // ============================================================
  // GET SINGLE CONVERSATION
  // ============================================================

  export const getConversationByIdController =
    async (req, res, next) => {
      try {
        const conversation =
          await getConversationById({
            conversationId:
              req.params.conversationId,

            userId:
              req.user._id,
          });

        return res.status(200).json({
          success: true,

          message:
            "Conversation retrieved successfully",

          data: {
            conversation,
          },
        });
      } catch (error) {
        next(error);
      }
    };