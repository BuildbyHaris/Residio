import bcrypt from "bcrypt";
import validator from "validator";
import { env } from "../../../config/env.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import {
  findUserByEmail,
  findUserByPhone,
  createUser,
  saveEmailOTP,
  findUserByEmailOTP,
  verifyUserEmail,
  findUserById,
  deleteUserById,
  findUserForLogin,
  updateUserPassword,
} from "../repositories/auth.repository.js";
import { DISPOSABLE_EMAILS } from "../constants/disposableEmails.js";
import { generateOTP } from "../utils/otp.js";
import { hashOTP } from "../utils/hashOTP.js";
import { otpTemplate } from "../templates/otp.template.js";

import {
  generateAccessToken,
  generateResetSessionToken,
  verifyResetSessionToken,
} from "../utils/token.js";

import { sendEmail } from "../../../shared/services/email.service.js";

import { AUTH_EMAIL_SUBJECTS } from "../constants/auth.constants.js";
/**
 * Register User
 */
export const registerUser = async (userData) => {
  const { name, email, phone, password } = userData;
  const role = "buyer";

  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }
  const domain = normalizedEmail.split("@")[1];
  const blockedDomains = new Set(DISPOSABLE_EMAILS);

  if (blockedDomains.has(domain)) {
    throw new Error("Disposable email addresses are not allowed.");
  }

 const phoneNumber = parsePhoneNumberFromString(phone, "PK");

if (!phoneNumber || !phoneNumber.isValid()) {
  throw new Error(
    "Please enter a valid Pakistani mobile or landline number."
  );
}

  // Check duplicate email
  const existingEmail = await findUserByEmail(normalizedEmail);

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
    email: normalizedEmail,
    phone,
    password: hashedPassword,
    role,
    isVerified: false,
  });

  // Generate OTP
  const otp = generateOTP();

  // Hash OTP before saving
  const hashedOTP = hashOTP(otp);

  // OTP expiry
  const otpExpires = new Date(
    Date.now() + 60 * 1000
  );

  // Save OTP
  await saveEmailOTP({
    email: normalizedEmail,
    emailOtp: hashedOTP,
    emailOtpExpires: otpExpires,
  });

  // Generate email template
  const html = otpTemplate({
    userName: user.name,
    otp,
  });

  try {
    await sendEmail({
      to: normalizedEmail,
      subject: AUTH_EMAIL_SUBJECTS.EMAIL_VERIFICATION,
      html,
    });
  } catch (error) {

    await deleteUserById(user._id);

    throw new Error(error.message);
  }

  return {
    success: true,
    message:
      "Registration successful. Please verify your email using the OTP sent to your inbox.",
    otpExpires,
  };
};

/**
 * Verify Email OTP
 */


export const verifyOTP = async ({
  email,
  otp,
}) => {

  const normalizedEmail =
    email.trim().toLowerCase();


  const existingUser = await findUserByEmail(normalizedEmail);

  if (!existingUser) {
    throw new Error("User not found.");
  }

  if (existingUser.isVerified) {
    throw new Error("User is already verified.");
  }

  const hashedOTP = hashOTP(otp);

  const user =
    await findUserByEmailOTP(
      normalizedEmail,
      hashedOTP
    );

  if (!user) {
    throw new Error(
      "Invalid or expired OTP."
    );
  }

  const updatedUser = await verifyUserEmail(user._id);

  const token = generateAccessToken(user._id);
  const userObject = updatedUser.toObject();
  delete userObject.password;
  delete userObject.emailOtp;
  delete userObject.emailOtpExpires;

  return {
    success: true,
    message:
      "Email verified successfully.",
    token,
    user: userObject,
  };
};

/**
 * Resend Email OTP
 */
export const resendOTP = async (email) => {
  const normalizedEmail =
    email.trim().toLowerCase();

  const user =
    await findUserByEmail(
      normalizedEmail
    );

  if (!user) {
    throw new Error("User not found.");
  }

  // if (user.isVerified) {
  //   const OTP_COOLDOWN = 60 * 1000;

  //   if (
  //     user.lastOtpSentAt &&
  //     Date.now() - user.lastOtpSentAt.getTime() <
  //     OTP_COOLDOWN
  //   ) {
  //     const remainingSeconds = Math.ceil(
  //       (OTP_COOLDOWN -
  //         (Date.now() -
  //           user.lastOtpSentAt.getTime())) /
  //       1000
  //     );

  //     throw new Error(
  //       `Please wait ${remainingSeconds} seconds before requesting another OTP.`
  //     );
  //   }
  // }
  if (user.isVerified) {
    throw new Error("User is already verified.");
  }


  const otp = generateOTP();

  const hashedOTP = hashOTP(otp);

  const emailOtpExpires =
    new Date(
      Date.now() +
      60 * 1000
    );

  await saveEmailOTP({
    email: normalizedEmail,
    emailOtp: hashedOTP,
    emailOtpExpires,
  });

  const html =
    otpTemplate({
      userName: user.name,
      otp,
    });

  await sendEmail({
    to: user.email,
    subject:
      AUTH_EMAIL_SUBJECTS.EMAIL_VERIFICATION,
    html,
  });

  return {
    success: true,
    message:
      "A new OTP has been sent to your email.",
    otpExpires: emailOtpExpires,
  };
};

/**
 * Login User
 */
export const loginUser = async ({
  email,
  password,
}) => {

  const normalizedEmail =
    email.trim().toLowerCase();

  const user =
    await findUserForLogin(
      normalizedEmail
    );

  if (!user) {
    throw new Error(
      "Invalid email or password."
    );
  }

  if (!user.isVerified) {
    throw new Error(
      "Please verify your email first."
    );
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const token =
    generateAccessToken(
      user._id
    );

  const userObject =
    user.toObject();

  delete userObject.password;

  return {
    success: true,
    message: "Login successful.",
    token,
    user: userObject,
  };

};

export const googleLoginUser = async (accessToken) => {
  try {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error("Invalid Google token.");
    }

    const payload = await response.json();
    const { email, name, picture } = payload;
    const normalizedEmail = email.trim().toLowerCase();

    let user = await findUserByEmail(normalizedEmail);

    if (!user) {
      // Create user if doesn't exist
      const randomPassword = Math.random().toString(36).slice(-10) + "A1!";
      const hashedPassword = await bcrypt.hash(randomPassword, env.bcryptSaltRounds);

      // Need a dummy phone since it's required in schema but not from Google
      const dummyPhone = "+92300" + Math.floor(1000000 + Math.random() * 9000000);

      user = await createUser({
        name,
        email: normalizedEmail,
        phone: dummyPhone,
        password: hashedPassword,
        role: "buyer",
        isVerified: true,
      });
    }

    const token = generateAccessToken(user._id);
    const userObject = user.toObject ? user.toObject() : user;
    delete userObject.password;
    delete userObject.emailOtp;
    delete userObject.emailOtpExpires;

    return {
      success: true,
      message: "Google login successful.",
      token,
      user: userObject,
    };
  } catch (error) {
    throw new Error("Invalid Google token.");
  }
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await findUserByEmail(normalizedEmail);

  const GENERIC_RESET_MESSAGE =
    "If an account with that email exists, a password reset OTP has been sent.";

  // Prevent email enumeration
  if (!user) {
    return {
      success: true,
      message: GENERIC_RESET_MESSAGE,
    };
  }

  // Check rate limiting / cooldown for OTP
  const OTP_COOLDOWN = 60 * 1000;
  if (
    user.lastOtpSentAt &&
    Date.now() - user.lastOtpSentAt.getTime() < OTP_COOLDOWN
  ) {
    const remainingSeconds = Math.ceil(
      (OTP_COOLDOWN - (Date.now() - user.lastOtpSentAt.getTime())) / 1000
    );
    throw new Error(
      `Please wait ${remainingSeconds} seconds before requesting another OTP.`
    );
  }

  // Generate OTP
  const otp = generateOTP();

  // Hash token before saving
  const hashedOTP = hashOTP(otp);

  // Expiry time
  const otpExpires = new Date(
    Date.now() + 60 * 1000
  );

  await saveEmailOTP({
    email: normalizedEmail,
    emailOtp: hashedOTP,
    emailOtpExpires: otpExpires,
  });

  // Email HTML
  const html = otpTemplate({
    userName: user.name,
    otp,
  });

  try {
    await sendEmail({
      to: user.email,
      subject: AUTH_EMAIL_SUBJECTS.FORGOT_PASSWORD,
      html,
    });
  } catch (error) {
    // Remove token if email fails
    await saveEmailOTP({
      email: normalizedEmail,
      emailOtp: null,
      emailOtpExpires: null,
    });

    throw new Error(
      "Unable to send password reset verification code.. Please try again."
    );
  }

  return {
    success: true,
    message: GENERIC_RESET_MESSAGE,
    otpExpires,
  };
};

/**
 * Reset Password
 */
export const resetPassword = async (
  resetSessionToken,
  newPassword
) => {
  if (!resetSessionToken || !newPassword) {
    throw new Error("Invalid reset request.");
  }

  // Verify the JWT reset session token
  const decoded = verifyResetSessionToken(resetSessionToken);

  // Find the user to ensure they still exist
  const user = await findUserById(decoded.id);
  if (!user) {
    throw new Error("Invalid or expired reset session.");
  }

  // Hash the new password
  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      env.bcryptSaltRounds
    );

  // Save new password
  await updateUserPassword({
    userId: user._id,
    password: hashedPassword,
  });

  return {
    success: true,
    message:
      "Password has been reset successfully.",
  };
};

/**
 * Verify Reset OTP
 */
export const verifyResetOTP = async ({ email, otp }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const hashedOTP = hashOTP(otp);

  const user = await findUserByEmailOTP(normalizedEmail, hashedOTP);

  if (!user) {
    throw new Error("Invalid or expired OTP.");
  }

  // Valid OTP. Now generate a password reset session token (JWT).
  const resetSessionToken = generateResetSessionToken(user._id);

  // Clear the OTP fields
  await saveEmailOTP({
    email: normalizedEmail,
    emailOtp: null,
    emailOtpExpires: null,
  });

  return {
    success: true,
    message: "OTP verified successfully.",
    resetSessionToken: resetSessionToken,
  };
};

/**
 * Verify Reset Session
 */
export const verifyResetSession = async (resetSessionToken) => {
  const decoded = verifyResetSessionToken(resetSessionToken);

  const user = await findUserById(decoded.id);

  if (!user) {
    throw new Error("Invalid or expired reset session.");
  }

  return {
    success: true,
    message: "Valid reset session.",
  };
};