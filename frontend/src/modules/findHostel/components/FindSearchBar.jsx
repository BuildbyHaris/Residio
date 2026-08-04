// src/modules/findHostel/components/FindSearchBar.jsx
import { MapPin, Calendar, Wallet, Search, ChevronDown } from 'lucide-react';

const FindSearchBar = ({ filters, cities = [], onChange, onSearch }) => {
  const budgetLabel = (() => {
    const min = Number(filters.minPrice) || 0;
    const max = Number(filters.maxPrice) || 0;
    if (!min && !max) return 'Select budget';
    if (max >= 100000) return `₹${min.toLocaleString()}+`;
    return `₹${min.toLocaleString()} – ₹${max.toLocaleString()}`;
  })();

  return (
    <section className="rounded-2xl border border-[#F5D9CA] bg-[#FFF6F0] px-6 py-7 md:px-10 md:py-8 mb-6">
      <h1 className="text-3xl md:text-[34px] font-bold text-[#1B2333] mb-6">
        Find Your <span className="text-[#F5732C]">Perfect</span> Hostel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-3">
        {/* Locality */}
        <div className="flex items-center gap-3 rounded-xl bg-white border border-[#F0E1D5] px-4 py-3">
          <MapPin className="w-5 h-5 text-[#F5732C] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-gray-500 leading-tight">Search locality, area or landmark</div>
            <input
              type="text"
              value={filters.q || ''}
              onChange={(e) => onChange({ q: e.target.value })}
              placeholder="Koramangala, Indiranagar, HSR Layout"
              className="w-full text-sm text-[#1B2333] placeholder:text-gray-400 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* City */}
        <div className="relative flex items-center gap-3 rounded-xl bg-white border border-[#F0E1D5] px-4 py-3">
          <MapPin className="w-5 h-5 text-[#F5732C] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-gray-500 leading-tight">Select City</div>
            <select
              value={filters.city || ''}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full text-sm text-[#1B2333] bg-transparent outline-none appearance-none pr-6"
            >
              <option value="">All cities</option>
              {cities.map((c) => (
                <option key={c.value || c} value={c.value || c}>{c.label || c}</option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Move-in Date */}
        <div className="flex items-center gap-3 rounded-xl bg-white border border-[#F0E1D5] px-4 py-3">
          <Calendar className="w-5 h-5 text-[#F5732C] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-gray-500 leading-tight">Move-in Date</div>
            <input
              type="date"
              value={filters.moveInDate || ''}
              onChange={(e) => onChange({ moveInDate: e.target.value })}
              className="w-full text-sm text-[#1B2333] bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Budget */}
        <div className="relative flex items-center gap-3 rounded-xl bg-white border border-[#F0E1D5] px-4 py-3">
          <Wallet className="w-5 h-5 text-[#F5732C] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-gray-500 leading-tight">Budget Range</div>
            <div className="text-sm text-[#1B2333] truncate">{budgetLabel}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Search */}
        <button
          onClick={onSearch}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#F5732C] hover:bg-[#E5631D] transition text-white font-semibold px-8 py-3"
        >
          <Search className="w-5 h-5" />
          Search
        </button>
      </div>
    </section>
  );
};

export default FindSearchBar;