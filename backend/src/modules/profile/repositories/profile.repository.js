import User from "../../auth/models/User.js";

/**
 * Get profile by user id
 */
export const findProfileById = async (userId) => {
  return await User.findById(userId)
    .select("-password -emailOtp");
};

/**
 * Update profile
 */
export const updateProfileById = async (
  userId,
  updateData
) => {
  return User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password -emailOtp");
};