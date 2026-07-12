import {
  createOwnerVerification,
  findOwnerVerificationByUserId,
  findOwnerVerificationByCnic,
  updateOwnerVerification,
  getAllOwnerVerifications,
  findOwnerVerificationById,
  updateVerificationStatus,
} from "../repositories/ownerVerification.repository.js";

import User from "../../auth/models/User.js";

/**
 * Submit Owner Verification
 */
export const submitOwnerVerificationService = async (
  userId,
  verificationData
) => {
  // Check user already submitted request
  const existingVerification =
    await findOwnerVerificationByUserId(userId);

  if (existingVerification) {
    throw new Error("Owner verification request already submitted.");
  }

  // Check CNIC already exists
  const existingCnic = await findOwnerVerificationByCnic(
    verificationData.cnic
  );

  if (existingCnic) {
    throw new Error("CNIC already exists.");
  }

  return await createOwnerVerification({
    user: userId,
    ...verificationData,
  });
};

/**
 * Get Logged-in User Verification
 */
export const getMyVerificationService = async (userId) => {
  return await findOwnerVerificationByUserId(userId);
};

/**
 * Update Verification
 */

export const updateOwnerVerificationService = async (
  userId,
  updateData
) => {
  const verification =
    await findOwnerVerificationByUserId(userId);

  if (!verification) {
    throw new Error("Verification request not found.");
  }

  return await updateOwnerVerification(userId, updateData);
};

/**
 * Get All Verification Requests (Admin)
 */
export const getAllVerificationsService = async () => {
  return await getAllOwnerVerifications();
};

/**
 * Approve Verification
 */
export const approveVerificationService = async (verificationId) => {
  const verification =
    await findOwnerVerificationById(verificationId);

  if (!verification) {
    throw new Error("Verification request not found.");
  }

  // Update Verification Status
  await updateVerificationStatus(
    verificationId,
    "approved",
    null
  );

  // Update User Role
  await User.findByIdAndUpdate(verification.user._id, {
    role: "owner",
  });

  return true;
};

/**
 * Reject Verification
 */
export const rejectVerificationService = async (
  verificationId,
  adminRemark
) => {
  const verification =
    await findOwnerVerificationById(verificationId);

  if (!verification) {
    throw new Error("Verification request not found.");
  }

  return await updateVerificationStatus(
    verificationId,
    "rejected",
    adminRemark
  );
};