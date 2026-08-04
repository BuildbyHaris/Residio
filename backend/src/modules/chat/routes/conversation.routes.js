import express from "express";

import {
  createOrGetPropertyConversationController,
  getConversationByIdController,
} from "../controllers/conversation.controller.js";

import { protect } from "../../auth/middlewares/protect.middleware.js";

import { validate } from "../../auth/validations/validation.middleware.js";

import {
  createPropertyConversationValidationSchema,
} from "../validations/conversation.validation.js";

const router = express.Router();


// ============================================================
// CREATE OR GET PROPERTY CONVERSATION
// POST /api/v1/chat/conversations
// ============================================================

router.post(
  "/conversations",
  protect,
  validate(
    createPropertyConversationValidationSchema
  ),
  createOrGetPropertyConversationController
);


// ============================================================
// GET SINGLE CONVERSATION
// GET /api/v1/chat/conversations/:conversationId
// ============================================================

router.get(
  "/conversations/:conversationId",
  protect,
  getConversationByIdController
);


export default router;