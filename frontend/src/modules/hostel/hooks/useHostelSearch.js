import { useState, useEffect, useCallback } from "react";
import { hostelApi } from "../api/hostel.api.js";
import { DEFAULT_FILTERS } from "../constants/hostel.constants.js";

export const useHostelSearch = () => {
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    roomType: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    sort: "newest",
    page: 1,
    limit: 12,
  });
  const [hostels, setHostels] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHostels = useCallback(async (searchFilters) => {
    try {
      setLoading(true);
      setError(null);
      const res = await hostelApi.search(searchFilters);
      if (res.data.success) {
        setHostels(res.data.data.hostels || []);
        setPagination(res.data.data.pagination || { total: 0, page: 1, limit: 12, totalPages: 0 });
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters) => {
  setFilters((prev) => {
    const updated = { ...prev, ...newFilters };
    // ✅ Sanitize price fields
    if (updated.minPrice !== undefined && updated.minPrice < 0) updated.minPrice = 0;
    if (updated.maxPrice !== undefined && updated.maxPrice < 0) updated.maxPrice = 0;
    if (newFilters.page === undefined) updated.page = 1;
    return updated;
  });
}, []);
  useEffect(() => {
    const timer = setTimeout(() => fetchHostels(filters), 500);
    return () => clearTimeout(timer);
  }, [filters, fetchHostels]);

  return {
    filters,
    hostels,
    pagination,
    loading,
    error,
    updateFilters,
    refetch: () => fetchHostels(filters),
  };
};