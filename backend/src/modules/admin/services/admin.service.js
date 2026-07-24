import bcrypt from "bcrypt";
import mongoose from "mongoose";

import {
    findAdminByEmail,
    countTotalUsers,
    countBuyers,
    countOwners,
    countAdmins,
    countPendingOwnerVerification,
    countApprovedOwnerVerification,
    countRejectedOwnerVerification,
    getPendingOwnerVerificationRequests,
    getOwnerVerificationById,
    createOwnerProfile,
    updateOwnerVerification,
} from "../repositories/admin.repository.js";

import {
    findUserById,
    updateUserById,
} from "../../auth/repositories/auth.repository.js";

import { generateAccessToken } from "../../auth/utils/token.js";

/**
 * Admin Login
 */
export const loginAdmin = async ({
    email,
    password,
}) => {
    const normalizedEmail = email.trim().toLowerCase();

    const admin = await findAdminByEmail(normalizedEmail);

    if (!admin) {
        throw new Error("Invalid email or password.");
    }

    if (!admin.isVerified) {
        throw new Error("Please verify your email first.");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        admin.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password.");
    }

   await updateUserById(admin._id, {
    lastLoginAt: new Date(),
});

    const token = generateAccessToken(admin._id);

    const adminObject = admin.toObject();

    delete adminObject.password;

    return {
        success: true,
        message: "Admin login successful.",
        token,
        admin: adminObject,
    };
};

/**
 * Get Dashboard Statistics
 */
export const getDashboardStats = async () => {
    const [
        totalUsers,
        buyers,
        owners,
        admins,
        pendingVerification,
        approvedVerification,
        rejectedVerification,
    ] = await Promise.all([
        countTotalUsers(),
        countBuyers(),
        countOwners(),
        countAdmins(),
        countPendingOwnerVerification(),
        countApprovedOwnerVerification(),
        countRejectedOwnerVerification(),
    ]);

    return {
        success: true,
        data: {
            users: {
                total: totalUsers,
                buyers,
                owners,
                admins,
            },
            ownerVerification: {
                pending: pendingVerification,
                approved: approvedVerification,
                rejected: rejectedVerification,
            },
            properties: {
                total: 0,
                pending: 0,
                approved: 0,
                rejected: 0,
            },
        },
    };
};

export const getPendingVerificationRequests = async ({
    page = 1,
    limit = 10,
}) => {
    const requests =
        await getPendingOwnerVerificationRequests({
            page,
            limit,
        });

    return {
        success: true,
        message:
            "Pending verification requests fetched successfully.",
        data: requests,
    };
};


export const getOwnerVerificationDetails = async (
    verificationId
) => {

    const verification =
        await getOwnerVerificationById(
            verificationId
        );

    if (!verification) {
        throw new Error(
            "Verification request not found."
        );
    }

    return {
        success: true,
        verification,
    };
};

export const approveOwnerVerification = async ({
    verificationId,
    adminId,
}) => {
    const verification =
        await getOwnerVerificationById(verificationId);

    if (!verification) {
        throw new Error(
            "Verification request not found."
        );
    }

    if (verification.status !== "pending") {
        throw new Error(
            "Verification request has already been reviewed."
        );
    }

    const user = verification.user;

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.ownerStatus !== "pending_owner") {
        throw new Error(
            "This verification request is not eligible for approval."
        );
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const approvedAt = new Date();

        // ==========================
        // Create Owner Profile
        // ==========================
        const ownerProfile =
            await createOwnerProfile(
                {
                    user: user._id,

                    verification:
                        verification._id,

                    businessName:
                        verification.businessName,

                    businessType:
                        verification.businessType,

                    experience:
                        verification.experience,

                    province:
                        verification.province,

                    city: verification.city,

                    address:
                        verification.address,

                    postalCode:
                        verification.postalCode,

                    isVerified: true,

                    verifiedAt: approvedAt,
                },
                session
            );

        // ==========================
        // Update Verification
        // ==========================
        await updateOwnerVerification(
            verification._id,
            {
                status: "approved",

                reviewedBy: adminId,

                reviewedAt: approvedAt,
            },
            session
        );

        // ==========================
        // Update User
        // ==========================
        await updateUserById(
            user._id,
            {
                role: "owner",

                ownerStatus: "owner",

                ownerProfile: ownerProfile._id,

                ownerApprovedAt: approvedAt,

                ownerApprovedBy: adminId,
                rejectionReason: "",
            },
            session
        );

        await session.commitTransaction();

        return {
            success: true,
            message:
                "Owner verification approved successfully.",
            ownerProfile,
        };
    } catch (error) {
        await session.abortTransaction();

        throw error;
    } finally {
        session.endSession();
    }
};

/**
 * Reject Owner Verification
 */
export const rejectOwnerVerification = async ({
  verificationId,
  adminId,
  rejectionReason,
}) => {

    console.log("🔥🔥🔥 REJECT SERVICE STARTED 🔥🔥🔥");

  console.log({
    verificationId,
    adminId,
    rejectionReason,
  });

  // ==========================
  // Find Verification
  // ==========================
  const verification =
    await getOwnerVerificationById(
      verificationId
    );
    

  if (!verification) {
    throw new Error(
      "Verification request not found."
    );
  }

  if (verification.status !== "pending") {
    throw new Error(
      "Verification request has already been reviewed."
    );
  }

  const user = verification.user;
  if (!user) {
    throw new Error("User not found.");
  }

  if (user.ownerStatus !== "pending_owner") {
    throw new Error(
      "This verification request is not eligible for rejection."
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const rejectedAt = new Date();

    // ==========================
    // Update Verification
    // ==========================
    await updateOwnerVerification(
      verification._id,
      {
        status: "rejected",
        reviewedBy: adminId,
        reviewedAt: rejectedAt,
        rejectionReason,
      },
      session
    );

    // ==========================
    // Update User
    // ==========================
    await updateUserById(
      user._id,
      {
        role: "buyer",

        ownerStatus: "rejected_owner",

        rejectionReason,

        ownerProfile: null,

        ownerApprovedAt: null,

        ownerApprovedBy: null,
      },
      session
    );

    await session.commitTransaction();

    return {
      success: true,
      message:
        "Owner verification rejected successfully.",
      userId: user._id,
      verificationId: verification._id,
      rejectedAt,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
