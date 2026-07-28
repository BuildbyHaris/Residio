import React, { useCallback } from "react";  // ✅ useCallback imported
import { useHostelSearch } from "../hooks/useHostelSearch.js";
import HostelCard from "../components/HostelCard.jsx";
import HostelFilters from "../components/HostelFilters.jsx";

// Memoize HostelFilters to avoid re-render if props unchanged
const MemoizedHostelFilters = React.memo(HostelFilters);

const FindHostel = () => {
  const { filters, hostels, pagination, loading, error, updateFilters, refetch } = useHostelSearch();

  // Stable callbacks
  const handleFilterChange = useCallback(
    (newFilters) => updateFilters(newFilters),
    [updateFilters]
  );

  const handleReset = useCallback(() => refetch(), [refetch]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find Your Perfect Hostel</h1>

        {/* Search Input – Always mounted */}
        <div className="max-w-2xl mx-auto mb-8">
  <div className="relative">
    {/* ✅ Search Icon */}
    <svg
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>

    {/* ✅ Input with left padding for icon */}
    <input
      key="search-input"
      type="text"
      placeholder="Search by Name, City, or Area..."
      value={filters.search}
      onChange={(e) => updateFilters({ search: e.target.value })}
      className="w-full p-3 pl-10 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      autoFocus
    />
  </div>
</div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading hostels...</div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-500">Error: {error}</div>
            <button
              onClick={handleReset}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <MemoizedHostelFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
            <div className="md:w-3/4">
              {hostels.length === 0 ? (
                <p className="text-center text-gray-500">No hostels found</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hostels.map((h) => (
                      <HostelCard key={h._id} hostel={h} />
                    ))}
                  </div>
                  {/* Pagination */}
                  <div className="flex justify-center gap-2 mt-6">
                    <button
                      disabled={!pagination.hasPrev}
                      onClick={() => updateFilters({ page: pagination.page - 1 })}
                      className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="px-4 py-2">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                      disabled={!pagination.hasNext}
                      onClick={() => updateFilters({ page: pagination.page + 1 })}
                      className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindHostel;