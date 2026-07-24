import { useState, useEffect, useCallback } from 'react';

import {
  getPendingVerificationRequests,
  getOwnerVerificationDetails,
  approveOwnerVerification,
  rejectOwnerVerification,
} from '../services/admin.service';

export const useOwnerVerifications = (page = 1, limit = 10) => {
  const [verifications, setVerifications] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVerifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPendingVerificationRequests(page, limit);

      if (!result.success) {
        setError(result.message);
        return;
      }

      /*
       * Backend response can have different nesting
       * depending on the controller/service response.
       */
      const responseData = result.data;

      const data =
        responseData?.data ||
        responseData;

      /*
       * Support different possible property names.
       */
      const verificationsArr =
        data?.requests ||
        data?.verifications ||
        data?.items ||
        [];

      const safeVerifications = Array.isArray(verificationsArr)
        ? verificationsArr
        : [];

      setVerifications(safeVerifications);

      setPagination({
        currentPage:
          Number(
            data?.pagination?.page ||
            data?.pagination?.currentPage
          ) || page,

        totalPages:
          Number(
            data?.pagination?.totalPages
          ) || 1,

        total:
          Number(
            data?.pagination?.total
          ) || safeVerifications.length,
      });

    } catch (error) {
      console.error(
        'Owner verification fetch error:',
        error
      );

      setError(
        'Something went wrong while loading owner verification requests.'
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchVerifications();
  }, [fetchVerifications]);

  return {
    verifications,
    pagination,
    loading,
    error,
    refetch: fetchVerifications,
  };
};


export const useVerificationDetails = (verificationId) => {
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    if (!verificationId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result =
        await getOwnerVerificationDetails(
          verificationId
        );

      if (result.success) {
        setVerification(
          result.data?.verification ||
          result.data
        );
      } else {
        setError(result.message);
      }

    } catch (error) {
      console.error(
        'Verification details error:',
        error
      );

      setError(
        'Something went wrong while loading verification details.'
      );
    } finally {
      setLoading(false);
    }
  }, [verificationId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    verification,
    loading,
    error,
    refetch: fetchDetails,
  };
};


export const useVerificationActions = () => {
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const approve = async (verificationId) => {
    setApproving(true);

    try {
      return await approveOwnerVerification(
        verificationId
      );
    } finally {
      setApproving(false);
    }
  };

  const reject = async (
    verificationId,
    reason
  ) => {
    setRejecting(true);

    try {
      return await rejectOwnerVerification(
        verificationId,
        reason
      );
    } finally {
      setRejecting(false);
    }
  };

  return {
    approve,
    reject,
    approving,
    rejecting,
  };
};