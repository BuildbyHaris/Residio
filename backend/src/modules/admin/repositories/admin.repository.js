import User from "../../auth/models/User.js";
import OwnerVerification from "../../ownerVerification/models/OwnerVerification.js";
import OwnerProfile from "../../ownerVerification/models/OwnerProfile.js";

/**
 * Find admin by email
 */
export const findAdminByEmail = async (email) => {
  return await User.findOne({
    email,
    role: "admin",
  }).select("+password");
};

/**
 * Get pending owner verification requests
 */
export const getPendingOwnerVerificationRequests = async ({
  page = 1,
  limit = 10,
}) => {

  const skip = (page - 1) * limit;

  const requests =
    await OwnerVerification.find({
      status: "pending",
    })
      .populate(
        "user",
        "name email phone profileImage"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

  const total =
    await OwnerVerification.countDocuments({
      status: "pending",
    });

  return {
    requests,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get verification by ID
 */
export const getOwnerVerificationById = async (
  verificationId
) => {
  console.log(
    "🔎 Searching OwnerVerification:",
    verificationId
  );

  const verification =
    await OwnerVerification.findById(
      verificationId
    ).populate(
      "user",
      "name email phone profileImage ownerStatus role"
    );

  console.log(
    "🔎 Verification result:",
    verification
  );

  console.log(
    "🔎 Populated user:",
    verification?.user
  );

  return verification;
};
/**
 * Find user by ID
 */
export const findUserById = async (userId) => {
  return await User.findById(userId);
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
 * Count total users
 */
export const countTotalUsers = async () => {
  return await User.countDocuments();
};
/**
 * Count buyers
 */
export const countBuyers = async () => {
  return await User.countDocuments({
    role: "buyer",
  });
};
/**
 * Count owners
 */
export const countOwners = async () => {
  return await User.countDocuments({
    role: "owner",
  });
};
/**
 * Count admins
 */
export const countAdmins = async () => {
  return await User.countDocuments({
    role: "admin",
  });
};
/**
 * Count pending owner verification requests
 */
export const countPendingOwnerVerification = async () => {
  return await OwnerVerification.countDocuments({
    status: "pending",
  });
};
/**
 * Count approved owner verification requests
 */
export const countApprovedOwnerVerification = async () => {
  return await OwnerVerification.countDocuments({
    status: "approved",
  });
};
/**
 * Count rejected owner verification requests
 */
export const countRejectedOwnerVerification = async () => {
  return await OwnerVerification.countDocuments({
    status: "rejected",
  });
};

/**
 * Create owner profile
 */
export const createOwnerProfile = async (
  profileData,
  session = null
) => {
  const ownerProfile = new OwnerProfile(profileData);

  return await ownerProfile.save({
    session,
  });
};

/**
 * Update Owner Verification
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