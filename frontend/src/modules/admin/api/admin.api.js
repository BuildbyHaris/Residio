import api from "../../../services/api";

/**
 * ============================================================
 * Admin Login
 * ============================================================
 */
export const adminLoginApi = async (credentials) => {
  const response = await api.post(
    "/admin/login",
    credentials,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

/**
 * ============================================================
 * Get Current Logged-In Admin
 * Used to restore admin session after page refresh
 * ============================================================
 */
export const getCurrentAdminApi = async () => {
  const response = await api.get(
    "/admin/me",
    {
      withCredentials: true,
    }
  );

  return response.data;
};

/**
 * ============================================================
 * Admin Logout
 * ============================================================
 */
export const adminLogoutApi = async () => {
  const response = await api.post(
    "/admin/logout",
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

/**
 * ============================================================
 * Dashboard Stats
 * ============================================================
 */
export const getDashboardStatsApi = async () => {
  const response = await api.get(
    "/admin/dashboard",
    {
      withCredentials: true,
    }
  );

  return response.data;
};

/**
 * ============================================================
 * Get Pending Owner Verification Requests
 * ============================================================
 */
export const getPendingVerificationRequestsApi = async (
  page = 1,
  limit = 10
) => {
  const response = await api.get(
    `/admin/owner-verifications?page=${page}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

/**
 * ============================================================
 * Get Owner Verification Details
 * ============================================================
 */
export const getOwnerVerificationDetailsApi = async (
  verificationId
) => {
  const response = await api.get(
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
export const approveOwnerVerificationApi = async (
  verificationId
) => {
  const response = await api.patch(
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
export const rejectOwnerVerificationApi = async (
  verificationId,
  rejectionReason
) => {
  const response = await api.patch(
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