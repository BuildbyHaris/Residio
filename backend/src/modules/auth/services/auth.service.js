import bcrypt from "bcrypt";
import { env } from "../../../config/env.js";
import {
  findUserByEmail,
  findUserByPhone,
  createUser,
  savePasswordResetToken,
} from "../repositories/auth.repository.js";

import { generateResetToken } from "../utils/token.js";
import { hashResetToken } from "../utils/hashToken.js";
import { sendEmail } from "../../../shared/services/email.service.js";
import { forgotPasswordTemplate } from "../templates/forgotPassword.template.js";

import { AUTH_EMAIL_SUBJECTS } from "../constants/auth.constants.js";

export const registerUser = async (userData) => {
  const { name, email, phone, password, role } = userData;

  // Check Duplicate Email
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check Duplicate Phone
  const existingPhone = await findUserByPhone(phone);

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(
    password,
    env.bcryptSaltRounds
  );
  // Create User
  const user = await createUser({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  // Return Response (Never return password)
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  };
};

export const forgotPassword = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await findUserByEmail(normalizedEmail);

  const GENERIC_RESET_MESSAGE =
    "If an account with that email exists, a password reset link has been sent.";
  if (!user) {
    return {
      success: true,
      message:
        GENERIC_RESET_MESSAGE,
    };
  }
  const resetToken = generateResetToken();

  const hashedResetToken = hashResetToken(resetToken);

  const passwordResetExpires = new Date(
    Date.now() + env.passwordResetExpiryMinutes * 60 * 1000
  );

  await savePasswordResetToken({
    email: normalizedEmail,
    passwordResetToken: hashedResetToken,
    passwordResetExpires,
  });
};

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

const passwordResetExpires = new Date(
  Date.now() + env.passwordResetExpiryMinutes * 60 * 1000
);

await savePasswordResetToken({
  email: normalizedEmail,
  passwordResetToken: hashedResetToken,
  passwordResetExpires,
});

const resetUrl =
  `${env.frontendUrl}/reset-password/${resetToken}`;

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
  await clearPasswordResetToken(normalizedEmail);

  throw new Error(
    "Unable to send password reset email. Please try again."
  );
}

return {
  success: true,
  message: GENERIC_RESET_MESSAGE
} 