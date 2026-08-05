import { useState, useMemo } from 'react';
import { Grid3x3, List, AlertCircle, SearchX } from 'lucide-react';
import Navbar from '../../landing/components/Navbar';
import FindSearchBar from '../components/FindSearchBar';
import FindHostelFilters from '../components/FindHostelFilters';
import HostelCard from '../../ownerDashboard/components/hostel/HostelCard';
import ActiveFilterChips from '../components/ActiveFilterChips';
import FindHostelSkeleton from '../components/FindHostelSkeleton';
import FindHostelPagination from '../components/FindHostelPagination';
import { useFindHostel } from '../hooks/useFindHostel';

const DEFAULT_FILTERS = {
  q: '', city: '', minPrice: 0, maxPrice: 0,
  moveInDate: '', gender: '', amenities: [], minRating: 0,
  sort: 'newest', page: 1,
};

const FindHostelPage = () => {
  const {
    filters, hostels = [], pagination = {},
    loading, error, updateFilters, refetch, cities = [],
  } = useFindHostel();

  const [view, setView] = useState('grid');

  const total = pagination.total ?? hostels.length;
  const currentPage = pagination.page ?? 1;
  const totalPages = pagination.totalPages ?? 1;

 const handleReset = () => {
  updateFilters(DEFAULT_FILTERS);
  refetch();
};
  const handleApply = () => {
  updateFilters({ page: 1 });
  refetch();
};

  const gridCols = useMemo(
    () => view === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
      : 'flex flex-col gap-4',
    [view]
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-6">
        <FindSearchBar
          filters={filters}
          cities={cities}
          onChange={updateFilters}
          onSearch={handleApply}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">
          <FindHostelFilters
            filters={filters}
            cities={cities}
            onChange={updateFilters}
            onReset={handleReset}
            onApply={handleApply}
          />

          <section>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="text-lg font-bold text-[#1B2333]">
                  {loading ? 'Loading…' : `${total} hostels found`}
                </h2>
                <ActiveFilterChips
                  filters={filters}
                  onChange={updateFilters}
                  onClearAll={handleReset}
                />
              </div>

              <div className="inline-flex items-center bg-white border border-[#EDEDED] rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`w-9 h-8 flex items-center justify-center rounded-md transition ${
                    view === 'grid' ? 'bg-[#FFF6F0] text-[#F5732C]' : 'text-gray-500'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`w-9 h-8 flex items-center justify-center rounded-md transition ${
                    view === 'list' ? 'bg-[#FFF6F0] text-[#F5732C]' : 'text-gray-500'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {error ? (
              <div className="bg-white border border-[#EDEDED] rounded-2xl p-12 text-center">
                <AlertCircle className="w-12 h-12 text-[#F5732C] mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-[#1B2333] mb-1">Something went wrong</h3>
                <p className="text-sm text-gray-500 mb-4">We couldn't load hostels right now.</p>
                <button
                  onClick={() => refetch?.()}
                  className="bg-[#F5732C] hover:bg-[#E5631D] text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : loading ? (
              <div className={gridCols}>
                {Array.from({ length: 6 }).map((_, i) => <FindHostelSkeleton key={i} />)}
              </div>
            ) : hostels.length === 0 ? (
              <div className="bg-white border border-[#EDEDED] rounded-2xl p-12 text-center">
                <SearchX className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-[#1B2333] mb-1">No hostels found</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Try adjusting your filters or searching another location.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-[#F5732C] hover:bg-[#E5631D] text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={gridCols}>
                  {hostels.map((h) => (
                    <HostelCard key={h._id || h.id} hostel={h} showActions={false} />
                  ))}
                </div>
                <FindHostelPagination
                  page={currentPage}
                  totalPages={totalPages}
                  onChange={(p) => updateFilters({ page: p })}
                />
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default FindHostelPage;