
import {
  loginAdmin,
  getDashboardStats,
  getPendingVerificationRequests,
  getOwnerVerificationDetails,
  approveOwnerVerification,
  rejectOwnerVerification,
} from "../services/admin.service.js";

export const loginAdminController = async (
  req,
  res,
  next
) => {
  try {
    const result = await loginAdmin(req.body);

    if (result.success && result.token) {
      res.cookie(
        "adminAccessToken",
        result.token,
        {
          httpOnly: true,

          secure:
            process.env.NODE_ENV ===
            "production",

          sameSite:
            process.env.NODE_ENV ===
              "production"
              ? "none"
              : "lax",

          path: "/",

          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        }
      );
    }

    return res.status(200).json({
      success: result.success,
      message: result.message,
      admin: result.admin,
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStatsController = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await getDashboardStats();

    return res
      .status(200)
      .json(result);
  } catch (error) {
    next(error);
  }
};

export const getPendingVerificationRequestsController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const {
        page,
        limit,
      } = req.query;

      const result =
        await getPendingVerificationRequests({
          page,
          limit,
        });

      return res
        .status(200)
        .json(result);
    } catch (error) {
      next(error);
    }
  };



export const getOwnerVerificationDetailsController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const result =
        await getOwnerVerificationDetails(
          req.params.verificationId
        );

      return res
        .status(200)
        .json(result);
    } catch (error) {
      next(error);
    }
  };



export const approveOwnerVerificationController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const result =
        await approveOwnerVerification({
          verificationId:
            req.params.verificationId,

          /**
           * adminProtect has already authenticated
           * the Admin and attached the Admin document
           * to req.user.
           */

          adminId:
            req.user._id,
        });

      return res
        .status(200)
        .json(result);
    } catch (error) {
      next(error);
    }
  };


export const rejectOwnerVerificationController =
  async (
    req,
    res,
    next
  ) => {
    try {
      const result =
        await rejectOwnerVerification({
          verificationId:
            req.params.verificationId,

          adminId:
            req.user._id,

          rejectionReason:
            req.body.rejectionReason,
        });

      return res
        .status(200)
        .json(result);
    } catch (error) {
      next(error);
    }
  };

export const logoutAdminController =
  async (
    req,
    res,
    next
  ) => {
    try {
      res.clearCookie(
        "adminAccessToken",
        {
          httpOnly: true,

          secure:
            process.env.NODE_ENV ===
            "production",

          sameSite:
            process.env.NODE_ENV ===
              "production"
              ? "none"
              : "lax",

          path: "/",
        }
      );

      return res
        .status(200)
        .json({
          success: true,
          message:
            "Admin logged out successfully.",
        });
    } catch (error) {
      next(error);
    }
  };

export const getCurrentAdminController =
  async (
    req,
    res,
    next
  ) => {
    try {
      return res
        .status(200)
        .json({
          success: true,
          admin: req.user,
        });
    } catch (error) {
      next(error);
    }
  };

