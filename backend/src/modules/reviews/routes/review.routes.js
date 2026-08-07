import express from "express";

import {
  createReview,
  getHostelReviews,
  getMyReview,
  updateReview,
  removeReview,
  getLatestReviews,
} from "../controllers/review.controller.js";

import { protect } from "../../auth/middlewares/protect.middleware.js";

import {
  validateCreateReview,
} from "../middleware/review.validation.middleware.js";

const router = express.Router();



// Create Review
router.post(
  "/",
  protect,
  validateCreateReview,
  createReview
);

// ==============================
// Get Latest Reviews for Home Page
// ==============================

router.get(
  "/latest",
  getLatestReviews
);

// Get Hostel Reviews
router.get(
  "/hostel/:hostelId",
  getHostelReviews
);



// Get Logged In User Review
router.get(
  "/my/:hostelId",
  protect,
  getMyReview
);



// Update Review
router.put(
  "/:reviewId",
  protect,
  validateCreateReview,
  updateReview
);



// Delete Review
router.delete(
  "/:reviewId",
  protect,
  removeReview
);

export default router;