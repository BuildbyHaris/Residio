import { useState, useEffect, useCallback } from 'react';

import {
  getDashboardStats,
  getPendingVerificationRequests,
} from '../services/admin.service';

const useAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingVerifications, setPendingVerifications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch dashboard stats
      const statsResult = await getDashboardStats();

      if (!statsResult.success) {
        setError(statsResult.message);
        return;
      }

      setStats(statsResult.data);

      // Fetch pending owner verifications
      const verificationResult =
        await getPendingVerificationRequests(1, 5);

      if (!verificationResult.success) {
        setError(verificationResult.message);
        return;
      }

      /*
       * API response:
       *
       * {
       *   success: true,
       *   message: "...",
       *   data: {
       *     requests: [...]
       *   }
       * }
       *
       * admin.service.js returns the complete response
       * as `data`.
       */

      const responseData =
        verificationResult.data;

      const requests =
        responseData?.data?.requests ||
        responseData?.requests ||
        [];

      setPendingVerifications(
        Array.isArray(requests)
          ? requests
          : []
      );

    } catch (error) {
      console.error(
        'Admin dashboard error:',
        error
      );

      setError(
        'Something went wrong while loading the dashboard.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats,
    pendingVerifications,
    loading,
    error,
    refetch: fetchDashboard,
  };
};

export default useAdminDashboard;