import express from "express";

import {
  register,
  verifyOTPController,
  resendOTPController,
  loginController,
  googleLoginController,
  forgotPasswordController,
  resetPasswordController,
  verifyResetOTPController,
  verifyResetSessionController,
  getCurrentUserController,
  logoutController,
} from "../controllers/auth.controller.js";

import {
verifyOtpValidationSchema
} from "../validations/verifyOtp.validation.js";

import {
resendOtpValidationSchema
}
from "../validations/resendOtp.validation.js";
import { loginValidationSchema } from "../validations/login.validation.js";

import { validate } from "../validations/validation.middleware.js";
import { protect } from "../middlewares/protect.middleware.js";
import { registerValidationSchema } from "../validations/register.validation.js";
import { forgotPasswordValidationSchema } from "../validations/forgotPassword.validation.js";
import { verifyResetOtpValidationSchema } from "../validations/verifyResetOtp.validation.js";
import { resetPasswordValidationSchema } from "../validations/resetPassword.validation.js";

const router = express.Router();

router.get(
  "/me",
  protect,
  getCurrentUserController
);

router.post(
  "/register",
  validate(registerValidationSchema),
  register
);

router.post(
    "/verify-otp",
    validate(
        verifyOtpValidationSchema
    ),
    verifyOTPController
);

router.post(
    "/resend-otp",
    validate(
        resendOtpValidationSchema
    ),
    resendOTPController
);

router.post(
    "/login",
    validate(loginValidationSchema),
    loginController
);

router.post(
    "/google-login",
    googleLoginController
);

router.post(
  "/logout",
  logoutController
);

router.post(
  "/forgot-password",
  validate(forgotPasswordValidationSchema),
  forgotPasswordController
);

router.post(
  "/verify-reset-otp",
  validate(verifyResetOtpValidationSchema),
  verifyResetOTPController
);

router.get(
  "/verify-reset-session",
  verifyResetSessionController
);

router.post(
  "/reset-password",
  validate(resetPasswordValidationSchema),
  resetPasswordController
);

export default router;