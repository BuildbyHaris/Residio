import express from "express";

import { protect } from "../../auth/middlewares/protect.middleware.js";
import { validate } from "../../auth/validations/validation.middleware.js";

import {
  getProfileController,
  updateProfileController,
} from "../controllers/profile.controller.js";

import { uploadProfileImage } from "../middlewares/profileUpload.middleware.js";

import { updateProfileValidationSchema } from "../validations/updateProfile.validation.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getProfileController
);

router.patch(
  "/",
  protect,
  uploadProfileImage.single("profileImage"),
  validate(updateProfileValidationSchema),
  updateProfileController
);

export default router;