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

/**
 * Save Email OTP
 */
export const saveEmailOTP = async ({
  email,
  emailOtp,
  emailOtpExpires,
}) => {
  return await User.findOneAndUpdate(
    { email },
    {
      emailOtp,
      emailOtpExpires,
      lastOtpSentAt: new Date(),
    },
    {
      new: true,
    }
  );
};

/**
 * Find user by Email OTP
 */
export const findUserByEmailOTP = async (
  email,
  emailOtp
) => {
  return await User.findOne({
    email,
    emailOtp,
    emailOtpExpires: {
      $gt: Date.now(),
    },
  }).select("+emailOtp +emailOtpExpires");
};

/**
 * Verify user email
 */
export const verifyUserEmail = async (
  userId
) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      isVerified: true,
      emailOtp: null,
      emailOtpExpires: null,
    },
    {
      new: true,
    }
  );
};

/**
 * Clear Email OTP
 */
export const clearEmailOTP = async (
  email
) => {
  return await User.findOneAndUpdate(
    { email },
    {
      emailOtp: null,
      emailOtpExpires: null,
    },
    {
      new: true,
    }
  );
};

/**
 * Delete User
 */
export const deleteUserById = async (
  userId
) => {
  return await User.findByIdAndDelete(userId);
};

/**
 * Find User For Login
 */
export const findUserForLogin = async (email) => {

    return await User.findOne({
        email,
    }).select("+password");

};

/**
 * Find user by ID
 */
export const findUserById = async (userId) => {
  return await User.findById(userId);
};

/**
 * Update user password
 */
export const updateUserPassword = async ({
  userId,
  password,
}) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      password,
    },
    {
      new: true,
    }
  );
};

/**
 * Update user by ID
 */
export const updateUserById = async (
  userId,
  updateData,
  session = null
) => {
  return await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
      session,
    }
  );
};

/**
 * Find user by ID with populated references
 */
export const findUserByIdWithProfile = async (
  userId
) => {
  return await User.findById(userId)
    .populate("ownerVerification")
    .populate("ownerProfile");
};