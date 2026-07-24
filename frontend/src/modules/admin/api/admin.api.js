import api from "../../../services/api";

export const adminLoginApi = async (
  credentials
) => {
  const response = await api.post(
    "/admin/login",
    credentials,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getCurrentAdminApi =
  async () => {
    const response =
      await api.get(
        "/admin/me",
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

export const adminLogoutApi =
  async () => {
    const response =
      await api.post(
        "/admin/logout",
        {},
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

export const getDashboardStatsApi =
  async () => {
    const response =
      await api.get(
        "/admin/dashboard",
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

export const getPendingVerificationRequestsApi =
  async (
    page = 1,
    limit = 10
  ) => {
    const response =
      await api.get(
        "/admin/owner-verifications",
        {
          params: {
            page,
            limit,
          },
          withCredentials: true,
        }
      );

    return response.data;
  };

export const getOwnerVerificationDetailsApi =
  async (
    verificationId
  ) => {
    const response =
      await api.get(
        `/admin/owner-verifications/${verificationId}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

/**
 * ============================================================
 * Approve Owner Verification
 * ============================================================
 */
export const approveOwnerVerificationApi =
  async (
    verificationId
  ) => {
    const response =
      await api.patch(
        `/admin/owner-verifications/${verificationId}/approve`,
        {},
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

/**
 * ============================================================
 * Reject Owner Verification
 * ============================================================
 */
export const rejectOwnerVerificationApi =
  async (
    verificationId,
    rejectionReason
  ) => {
    const response =
      await api.patch(
        `/admin/owner-verifications/${verificationId}/reject`,
        {
          rejectionReason,
        },
        {
          withCredentials: true,
        }
      );

    return response.data;
  };