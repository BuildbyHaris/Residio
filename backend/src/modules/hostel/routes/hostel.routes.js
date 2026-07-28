import express from "express";
import { getHostels, getHostelDetail } from "../controllers/hostel.controller.js";
import {
  validateSearchQuery,
  validateHostelId,
  handleValidationErrors,
} from "../validations/hostel.validation.js";
import { sanitizeSearchQuery, rateLimiter } from "../middlewares/hostel.middleware.js";

const router = express.Router();

// GET /api/v1/hostels
router.get(
  "/",
  rateLimiter,
  sanitizeSearchQuery,
  validateSearchQuery,
  handleValidationErrors,
  getHostels
);

// GET /api/v1/hostels/:id
router.get(
  "/:id",
  rateLimiter,
  validateHostelId,
  handleValidationErrors,
  getHostelDetail
);

export default router;