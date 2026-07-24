import express from "express";

import {
  loginAdminController,
  getCurrentAdminController,
  logoutAdminController,
  getDashboardStatsController,
  getPendingVerificationRequestsController,
  getOwnerVerificationDetailsController,
  approveOwnerVerificationController,
  rejectOwnerVerificationController,
} from "../controllers/admin.controller.js";

import adminProtect from "../middlewares/adminProtect.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

import {
  adminLoginValidationSchema,
  rejectOwnerVerificationValidation,
} from "../validations/admin.validation.js";

import validate from "../../auth/validations/validation.middleware.js";

const router = express.Router();

router.post(
  "/login",
  validate(adminLoginValidationSchema),
  loginAdminController
);

router.get(
  "/dashboard",
  adminProtect,
  adminOnly,
  getDashboardStatsController
);

router.get(
  "/owner-verifications",
  adminProtect,
  adminOnly,
  getPendingVerificationRequestsController
);

router.get(
  "/owner-verifications/:verificationId",
  adminProtect,
  adminOnly,
  getOwnerVerificationDetailsController
);

router.patch(
  "/owner-verifications/:verificationId/approve",
  adminProtect,
  adminOnly,
  approveOwnerVerificationController
);

router.patch(
  "/owner-verifications/:verificationId/reject",
  adminProtect,
  adminOnly,
  validate(rejectOwnerVerificationValidation),
  rejectOwnerVerificationController
);

router.get(
  "/me",
  adminProtect,
  adminOnly,
  getCurrentAdminController
);

router.post(
  "/logout",
  adminProtect,
  adminOnly,
  logoutAdminController
);

export default router;