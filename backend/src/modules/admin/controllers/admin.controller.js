import {
  loginAdmin,
  getDashboardStats,
  getPendingVerificationRequests,
  getOwnerVerificationDetails,
  approveOwnerVerification,
  rejectOwnerVerification,
} from "../services/admin.service.js";

/**
 * Admin Login
 */
export const loginAdminController = async (
  req,
  res,
  next
) => {
  try {
    const result = await loginAdmin(req.body);

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: result.success,
      message: result.message,
      admin: result.admin,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Dashboard Statistics
 */
export const getDashboardStatsController =
  async (req, res, next) => {
    try {
      const result =
        await getDashboardStats();

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
 * Pending Verification Requests
 */
export const getPendingVerificationRequestsController =
  async (req, res, next) => {
    try {
      const { page, limit } = req.query;

      const result =
        await getPendingVerificationRequests({
          page,
          limit,
        });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
 * Verification Details
 */
export const getOwnerVerificationDetailsController =
  async (req, res, next) => {
    try {
      const result =
        await getOwnerVerificationDetails(
          req.params.verificationId
        );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
 * Approve Verification
 */
export const approveOwnerVerificationController =
  async (req, res, next) => {
    try {
      const result =
        await approveOwnerVerification({
          verificationId:
            req.params.verificationId,
          adminId: req.user._id,
        });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
 * Reject Verification
 */
export const rejectOwnerVerificationController =
  async (req, res, next) => {
    try {
         console.log("🔥 REJECT CONTROLLER HIT");
      console.log("Params:", req.params);
      console.log("Body:", req.body);
      console.log("Admin:", req.user);
      const result =
        await rejectOwnerVerification({
          verificationId:
            req.params.verificationId,
          adminId: req.user._id,
          rejectionReason:
            req.body.rejectionReason,
        });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  export const logoutAdminController = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentAdminController = async (
  req,
  res,
  next
) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.user,
    });
  } catch (error) {
    next(error);
  }
};