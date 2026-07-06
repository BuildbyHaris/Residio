import express from "express";

import {
  register,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/auth.controller.js";

import { validate } from "../validations/validation.middleware.js";

import { registerValidationSchema } from "../validations/register.validation.js";
import { forgotPasswordValidationSchema } from "../validations/forgotPassword.validation.js";
import { resetPasswordValidationSchema } from "../validations/resetPassword.validation.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerValidationSchema),
  register
);

router.post(
  "/forgot-password",
  validate(forgotPasswordValidationSchema),
  forgotPasswordController
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordValidationSchema),
  resetPasswordController
);

export default router;