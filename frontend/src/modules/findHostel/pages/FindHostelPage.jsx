import React, { useCallback } from "react"; // ✅ useCallback imported
import { useFindHostel } from "../hooks/useFindHostel.js";
import HostelCard from "../../ownerDashboard/components/hostel/HostelCard.jsx" 
import FindHostelCard from "../components/FindHostelCard.jsx";
import FindHostelFilters from "../components/FindHostelFilters.jsx";
import FindSearchBar from "../components/FindSearchBar.jsx";

console.log("✅ FindHostelPage Render");

const MemoizedHostelFilters = React.memo(FindHostelFilters);

const FindHostelPage = () => {
  const { filters, hostels, pagination, loading, error, updateFilters, refetch } = useFindHostel();

  const handleSearch = useCallback(
    (newFilters) => {
      updateFilters({ ...newFilters, page: 1 });
      refetch();
    },
    [updateFilters, refetch]
  );

  const handleApply = useCallback(
    (newFilters) => {
      updateFilters({ ...newFilters, page: 1 });
      refetch();
    },
    [updateFilters, refetch]
  );

  const handleReset = useCallback(
    (defaultFilters) => {
      updateFilters(defaultFilters);
      refetch();
    },
    [updateFilters, refetch]
  );

  console.log({
  loading,
  error,
  hostels,
  filters,
});

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Find Your Perfect Hostel</h1>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto mb-8">
          <FindSearchBar initialFilters={filters} onSearch={handleSearch} />
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading hostels...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="text-red-500">Error: {error}</div>
            <button
              onClick={() => refetch()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col md:flex-row gap-8">
            {/* ✅ SIDEBAR – Yeh lines */}
                <div className="w-full md:w-1/4 flex-shrink-0">
      <FindHostelFilters
        filters={filters}
        onApply={handleApply}
        onReset={handleReset}
      />
    </div>

            {/* Results */}
            <div className="md:w-3/4">
              {hostels.length === 0 ? (
                <p className="text-center text-gray-500">No hostels found</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hostels.map((h) => (
                      <FindHostelCard key={h._id} hostel={h} />
                    ))}
                  </div>
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

export default FindHostelPage;