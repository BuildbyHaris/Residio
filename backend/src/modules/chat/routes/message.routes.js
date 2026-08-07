import express from "express";

import {
  sendMessageController,
  getConversationMessagesController,
  markMessagesAsDeliveredController,
  markMessagesAsReadController,
  deleteMessageController,
} from "../controllers/message.controller.js";

import protect from "../../auth/middlewares/protect.middleware.js";

const router = express.Router();

/**
 * Send message
 */
router.post(
  "/messages",
  protect,
  sendMessageController
);

/**
 * Get conversation messages
 */
router.get(
  "/conversations/:conversationId/messages",
  protect,
  getConversationMessagesController
);

/**
 * Mark messages as delivered
 */
router.patch(
  "/conversations/:conversationId/messages/delivered",
  protect,
  markMessagesAsDeliveredController
);

/**
 * Mark messages as read
 */
router.patch(
  "/conversations/:conversationId/messages/read",
  protect,
  markMessagesAsReadController
);

router.delete(
  "/conversations/:conversationId/messages/:messageId",
  protect,
  deleteMessageController
);

export default router;