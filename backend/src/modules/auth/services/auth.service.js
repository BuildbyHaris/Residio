import bcrypt from "bcrypt";
import { env } from "../../../config/env.js";

import {
  findUserByEmail,
  findUserByPhone,
  createUser,
  savePasswordResetToken,
  clearPasswordResetToken,
} from "../repositories/auth.repository.js";

import { generateResetToken } from "../utils/token.js";
import { hashResetToken } from "../utils/hashToken.js";

import { sendEmail } from "../../../shared/services/email.service.js";
import { forgotPasswordTemplate } from "../templates/forgotPassword.template.js";

import { AUTH_EMAIL_SUBJECTS } from "../constants/auth.constants.js";

/**
 * Register User
 */
export const registerUser = async (userData) => {
  const { name, email, phone, password, role } = userData;

  // Check duplicate email
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check duplicate phone
  const existingPhone = await findUserByPhone(phone);

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    env.bcryptSaltRounds
  );

  // Create user
  const user = await createUser({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  };
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await findUserByEmail(normalizedEmail);

  const GENERIC_RESET_MESSAGE =
    "If an account with that email exists, a password reset link has been sent.";

  // Prevent email enumeration
  if (!user) {
    return {
      success: true,
      message: GENERIC_RESET_MESSAGE,
    };
  }

  // Generate reset token
  const resetToken = generateResetToken();

  // Hash token before saving
  const hashedResetToken = hashResetToken(resetToken);

  // Expiry time
  const passwordResetExpires = new Date(
    Date.now() + env.passwordResetExpiryMinutes * 60 * 1000
  );

  // Save hashed token
  await savePasswordResetToken({
    email: normalizedEmail,
    passwordResetToken: hashedResetToken,
    passwordResetExpires,
  });
// export const savePasswordResetToken = async ({
//   email,
//   passwordResetToken,
//   passwordResetExpires,
// }) => {
//   return await User.findOneAndUpdate(
//     { email },
//     {
//       passwordResetToken,
//       passwordResetExpires,
//     },
//     { new: true }
//   );
// };
  // Frontend reset URL
  const resetUrl = `${env.frontendUrl}/reset-password/${resetToken}`;


  // Email HTML
  const html = forgotPasswordTemplate({
    userName: user.name,
    resetUrl,
  });

  try {
    await sendEmail({
      to: user.email,
      subject: AUTH_EMAIL_SUBJECTS.FORGOT_PASSWORD,
      html,
    });
  } catch (error) {
    // Remove token if email fails
    await clearPasswordResetToken(normalizedEmail);

    throw new Error(
      "Unable to send password reset email. Please try again."
    );
  }

  return {
    success: true,
    message: GENERIC_RESET_MESSAGE,
  };
};