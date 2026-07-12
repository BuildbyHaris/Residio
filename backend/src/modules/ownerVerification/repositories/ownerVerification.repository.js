import OwnerVerification from "../models/ownerVerification.js";

/**
 * Create owner verification request
 */
export const createOwnerVerification = async (verificationData) => {
  return await OwnerVerification.create(verificationData);
};

/**
 * Find verification by user ID
 */
export const findOwnerVerificationByUserId = async (userId) => {
  return await OwnerVerification.findOne({ user: userId });
};

/**
 * Find verification by CNIC
 */
export const findOwnerVerificationByCnic = async (cnic) => {
  return await OwnerVerification.findOne({ cnic });
};

/**
 * Update verification by user ID
 */
export const updateOwnerVerification = async (userId, updateData) => {
  return await OwnerVerification.findOneAndUpdate(
    { user: userId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Get all owner verification requests
 */
export const getAllOwnerVerifications = async () => {
  return await OwnerVerification.find().populate(
    "user",
    "name email phone role"
  );
};

/**
 * Find verification by ID
 */
export const findOwnerVerificationById = async (id) => {
  return await OwnerVerification.findById(id).populate(
    "user",
    "name email phone role"
  );
};

/**
 * Update verification status
 */
export const updateVerificationStatus = async (id, status, adminRemark) => {
  return await OwnerVerification.findByIdAndUpdate(
    id,
    {
      status,
      adminRemark,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};