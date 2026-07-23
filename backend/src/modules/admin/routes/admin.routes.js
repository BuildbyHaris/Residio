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
import { adminOnly } from "../middlewares/admin.middleware.js";

import {
  adminLoginValidationSchema,
  rejectOwnerVerificationValidation,
} from "../validations/admin.validation.js";

import validate from "../../auth/validations/validation.middleware.js";

import { protect } from "../../auth/middlewares/protect.middleware.js";

const router = express.Router();

router.post(
  "/login",
  validate(adminLoginValidationSchema),
  loginAdminController
);

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardStatsController
);

router.get(
  "/owner-verifications",
  protect,
  adminOnly,
  getPendingVerificationRequestsController
);

router.get(
  "/owner-verifications/:verificationId",
  protect,
  adminOnly,
  getOwnerVerificationDetailsController
);

router.patch(
  "/owner-verifications/:verificationId/approve",
  protect,
  adminOnly,
  approveOwnerVerificationController
);

router.post(
  "/logout",
  protect,
  adminOnly,
  logoutAdminController
);

router.get(
  "/me",
  protect,
  adminOnly,
  getCurrentAdminController
);

router.patch(
  "/owner-verifications/:verificationId/reject",
  (req, res, next) => {
    console.log("🔥 REJECT ROUTE MATCHED");
    next();
  },
  protect,
   (req, res, next) => {
    console.log("🔥 2. PROTECT PASSED");
    console.log("Authenticated user:", req.user);
    next();
  },
  adminOnly,
  (req, res, next) => {
    console.log("🔥 3. ADMIN ONLY PASSED");
    next();
  },
  rejectOwnerVerificationController
);

export default router;