import OwnerVerification from "../models/OwnerVerification.js";
import OwnerProfile from "../models/OwnerProfile.js";

// ======================================================
// Owner Verification
// ======================================================

/**
 * Create Owner Verification
 */
export const createOwnerVerification = async (
  verificationData,
  session = null
) => {
  const [verification] = await OwnerVerification.create(
    [verificationData],
    { session }
  );

  return verification;
};

/**
 * Find Verification By User ID
 */
export const findOwnerVerificationByUserId = async (
  userId
) => {
  return await OwnerVerification.findOne({
    user: userId,
  });
};

/**
 * Find Verification By ID
 */
export const findOwnerVerificationById = async (
  verificationId
) => {
  return await OwnerVerification.findById(
    verificationId
  );
};

/**
 * Update Verification
 */
export const updateOwnerVerification = async (
  verificationId,
  updateData,
  session = null
) => {
  return await OwnerVerification.findByIdAndUpdate(
    verificationId,
    updateData,
    {
      new: true,
      runValidators: true,
      session,
    }
  );
};

/**
 * Delete Verification
 * (Useful if transaction is not used or manual cleanup is needed)
 */
export const deleteOwnerVerification = async (
  verificationId,
  session = null
) => {
  return await OwnerVerification.findByIdAndDelete(
    verificationId,
    {
      session,
    }
  );
};

// ======================================================
// Owner Profile
// ======================================================

/**
 * Create Owner Profile
 */
export const createOwnerProfile = async (
  profileData,
  session = null
) => {
  const [profile] = await OwnerProfile.create(
    [profileData],
    { session }
  );

  return profile;
};

/**
 * Find Owner Profile By User ID
 */
export const findOwnerProfileByUserId = async (
  userId
) => {
  return await OwnerProfile.findOne({
    user: userId,
  });
};

/**
 * Find Owner Profile By ID
 */
export const findOwnerProfileById = async (
  profileId
) => {
  return await OwnerProfile.findById(profileId);
};

/**
 * Update Owner Profile
 */
export const updateOwnerProfile = async (
  profileId,
  updateData,
  session = null
) => {
  return await OwnerProfile.findByIdAndUpdate(
    profileId,
    updateData,
    {
      new: true,
      runValidators: true,
      session,
    }
  );
};

/**
 * Delete Owner Profile
 * (Useful if transaction is not used or manual cleanup is needed)
 */
export const deleteOwnerProfile = async (
  profileId,
  session = null
) => {
  return await OwnerProfile.findByIdAndDelete(
    profileId,
    {
      session,
    }
  );
};