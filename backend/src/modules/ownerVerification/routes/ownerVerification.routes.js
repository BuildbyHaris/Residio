import express from "express";

import {
  submitOwnerVerification,
  getMyVerification,
  updateOwnerVerification,
  getAllVerifications,
  approveVerification,
  rejectVerification,
} from "../controllers/ownerVerification.controller.js";

import { protect } from "../../auth/middlewares/protect.middleware.js";

import { validate } from "../../auth/validations/validation.middleware.js";

import { ownerVerificationValidationSchema } from "../validations/ownerVerification.validation.js";

import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

/**
 * Submit Owner Verification
 */
router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "cnicFrontImage",
      maxCount: 1,
    },
    {
      name: "cnicBackImage",
      maxCount: 1,
    },
    {
      name: "propertyProof",
      maxCount: 1,
    },
    {
      name: "selfieWithCnic",
      maxCount: 1,
    },
  ]),
  validate(ownerVerificationValidationSchema),
  submitOwnerVerification
);

/**
 * Get Logged-in User Verification
 */
router.get(
  "/me",
  protect,
  getMyVerification
);

/**
 * Update Owner Verification
 */
router.put(
  "/",
  protect,
  upload.fields([
    {
      name: "cnicFrontImage",
      maxCount: 1,
    },
    {
      name: "cnicBackImage",
      maxCount: 1,
    },
    {
      name: "propertyProof",
      maxCount: 1,
    },
    {
      name: "selfieWithCnic",
      maxCount: 1,
    },
  ]),
  validate(ownerVerificationValidationSchema),
  updateOwnerVerification
);

/**
 * Admin - Get All Verification Requests
 */
router.get(
  "/all",
  protect,
  getAllVerifications
);

/**
 * Admin - Approve Verification
 */
router.patch(
  "/:id/approve",
  protect,
  approveVerification
);

/**
 * Admin - Reject Verification
 */
router.patch(
  "/:id/reject",
  protect,
  rejectVerification
);

export default router;