import { useState, useEffect, useCallback } from "react";
import { findApi } from "../api/find.api.js";
import { DEFAULT_FILTERS } from "../constants/find.constants.js";

export const useFindHostel = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [hostels, setHostels] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ fetch function – useCallback se stable banayein
  const fetchHostels = useCallback(async (searchFilters) => {
  try {
    setLoading(true);
    setError(null);

    // Remove empty values
    const params = { ...searchFilters };

    Object.keys(params).forEach((key) => {
  if (
    params[key] === "" ||
    params[key] === null ||
    params[key] === undefined ||
    params[key] === 0 ||
    (Array.isArray(params[key]) && params[key].length === 0)
  ) {
    delete params[key];
  }
});

    const res = await findApi.search(params);



    if (res.data.success) {
      setHostels(res.data.data.hostels || []);
      setPagination(
        res.data.data.pagination || {
          total: 0,
          page: 1,
          limit: 6,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        }
      );
    } else {
      setError(res.data.message);
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, []); // ✅ Empty dependencies – function stable hai

  // ✅ updateFilters – stable function
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      if (newFilters.page === undefined) updated.page = 1;
      return updated;
    });
  }, []);

  // ✅ Debounced effect – sirf filters change hone par call ho
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHostels(filters);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters, fetchHostels]); // ✅ fetchHostels stable hai

  // ✅ refetch – manual refresh
  const refetch = useCallback(() => {
    fetchHostels(filters);
  }, [filters, fetchHostels]);

  const cities = [...new Set(hostels.map((hostel) => hostel.city).filter(Boolean))];


  return {
    filters,
  hostels,
  pagination,
  loading,
  error,
  updateFilters,
  refetch,
  cities,
  };
}