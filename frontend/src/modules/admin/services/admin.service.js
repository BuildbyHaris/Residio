import {
  adminLoginApi,
  adminLogoutApi,
  getCurrentAdminApi,
  getDashboardStatsApi,
  getPendingVerificationRequestsApi,
  getOwnerVerificationDetailsApi,
  approveOwnerVerificationApi,
  rejectOwnerVerificationApi,
} from "../api/admin.api";

const getFriendlyErrorMessage = (error) => {
  if (!error.response) {
    return "We couldn't connect to the server right now. Please check your connection and try again.";
  }

  const status = error.response.status;
  const backendMessage =
    error.response?.data?.message || "";

  const normalizedMessage =
    backendMessage.toLowerCase();

  switch (status) {
    case 400:
      if (
        normalizedMessage.includes("email") &&
        normalizedMessage.includes("password")
      ) {
        return "Please enter both your email and password to sign in.";
      }

      return (
        backendMessage ||
        "Something doesn't look right. Please check your input and try again."
      );

    case 401:
      if (
        normalizedMessage.includes("verify")
      ) {
        return "Your admin account still needs email verification. Please verify your email before signing in.";
      }

      if (
        normalizedMessage.includes("invalid") ||
        normalizedMessage.includes("password")
      ) {
        return "Your email or password doesn't look right. Please check your details and try again.";
      }

      return "Your admin session has expired. Please sign in again.";

    case 403:
      return "You don't have permission to access the Admin Panel.";

    case 404:
      if (
        normalizedMessage.includes(
          "verification"
        )
      ) {
        return "We couldn't find this verification request. It may have already been processed.";
      }

      if (
        normalizedMessage.includes("admin")
      ) {
        return "No admin account found with this email address.";
      }

      return "We couldn't find what you're looking for.";

    case 409:
      return (
        backendMessage ||
        "This action has already been completed."
      );

    case 422:
      return (
        backendMessage ||
        "Please check your input and try again."
      );

    case 429:
      return "Too many attempts. Please wait a moment and try again.";

    case 500:
      return "Something went wrong on our side. Please try again in a moment.";

    default:
      return (
        backendMessage ||
        "An unexpected error occurred. Please try again."
      );
  }
};

export const loginAdmin = async (
  email,
  password
) => {
  try {
    const response =
      await adminLoginApi({
        email,
        password,
      });

    return {
      success: true,
      data: response?.admin || null,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        getFriendlyErrorMessage(error),
    };
  }
};

export const getCurrentAdmin = async () => {
  try {
    const response =
      await getCurrentAdminApi();

    return {
      success: true,
      data: response?.admin || null,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        getFriendlyErrorMessage(error),
    };
  }
};

export const logoutAdmin = async () => {
  try {
    const response =
      await adminLogoutApi();

    return {
      success: true,
      data:
        response?.data || response,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        getFriendlyErrorMessage(error),
    };
  }
};

export const getDashboardStats = async () => {
  try {
    const response =
      await getDashboardStatsApi();

    return {
      success: true,
      data:
        response?.data || response,
      message: response?.message,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        getFriendlyErrorMessage(error),
    };
  }
};

export const getPendingVerificationRequests =
  async (
    page = 1,
    limit = 10
  ) => {
    try {
      const response =
        await getPendingVerificationRequestsApi(
          page,
          limit
        );

      return {
        success: true,
        data:
          response?.data || response,
        message: response?.message,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          getFriendlyErrorMessage(error),
      };
    }
  };

export const getOwnerVerificationDetails =
  async (verificationId) => {
    try {
      const response =
        await getOwnerVerificationDetailsApi(
          verificationId
        );

      return {
        success: true,
        data:
          response?.data ||
          response?.verification ||
          response,
        message: response?.message,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          getFriendlyErrorMessage(error),
      };
    }
  };

export const approveOwnerVerification =
  async (verificationId) => {
    try {
      const response =
        await approveOwnerVerificationApi(
          verificationId
        );

      return {
        success: true,
        data:
          response?.data || response,
        message: response?.message,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          getFriendlyErrorMessage(error),
      };
    }
  };

export const rejectOwnerVerification =
  async (
    verificationId,
    rejectionReason
  ) => {
    try {
      const response =
        await rejectOwnerVerificationApi(
          verificationId,
          rejectionReason
        );

      return {
        success: true,
        data:
          response?.data || response,
        message: response?.message,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message:
          getFriendlyErrorMessage(error),
      };
    }
  };