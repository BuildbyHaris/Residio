import express from "express";

import {
  register,
  forgotPasswordController,
} from "../controllers/auth.controller.js";

import {
  registerValidation,
  forgotPasswordValidation,
  validate,
} from "../validations/register.validation.js";

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