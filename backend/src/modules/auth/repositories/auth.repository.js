import User from "../models/User.js";
/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * Find user by phone
 */
export const findUserByPhone = async (phone) => {
  return await User.findOne({
    phone,
  });
};

/**
 * Create new user
 */
export const createUser = async (userData) => {
  const user = new User(userData);

  return await user.save();
};

/* ==========================================================
   Email Verification OTP
========================================================== */


/**
 * Clear Email Verification OTP
 */
export const clearEmailVerificationOTP = async (email) => {
  return await User.findOneAndUpdate(
    { email },
    {
      emailVerificationOTP: null,
      emailVerificationOTPExpires: null,
      otpAttempts: 0,
      isVerified: true,
    },
    {
      new: true,
    }
  );
};

/**
 * Find user by valid Email Verification OTP
 */
export const findUserByVerificationOTP = async (
  emailVerificationOTP
) => {
  return await User.findOne({
    emailVerificationOTP,
    emailVerificationOTPExpires: {
      $gt: Date.now(),
    },
  });
};

/* ==========================================================
   Password Reset
========================================================== */

/**
 * Save password reset token
 */
export const savePasswordResetToken = async ({
  email,
  passwordResetToken,
  passwordResetExpires,
}) => {
  return await User.findOneAndUpdate(
    { email },
    {
      passwordResetToken,
      passwordResetExpires,
    },
    {
      new: true,
    }
  );
};

/**
 * Find user by valid password reset token
 */
export const findUserByPasswordResetToken = async (
  passwordResetToken
) => {
  return await User.findOne({
    passwordResetToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });
};

/**
 * Update user password and clear reset token
 */
export const updateUserPassword = async ({
  userId,
  password,
}) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      password,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
    {
      new: true,
    }
  );
};