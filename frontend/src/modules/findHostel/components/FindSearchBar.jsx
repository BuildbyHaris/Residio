// src/modules/findHostel/components/FindSearchBar.jsx
import { MapPin, Calendar, Wallet, Search, ChevronDown } from "lucide-react";

const FindSearchBar = ({ filters, cities = [], onChange, onSearch }) => {
  console.log("SearchBar Cities:", cities);
  const budgetLabel = (() => {
    const min = Number(filters.minPrice) || 0;
    const max = Number(filters.maxPrice) || 0;
    if (!min && !max) return "Select budget";
    if (max >= 100000) return `RS${min.toLocaleString()}+`;
    return `RS${min.toLocaleString()} – RS${max.toLocaleString()}`;
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
            <div className="text-[11px] text-gray-500 leading-tight">
              Search hostel by name, address or city
            </div>
            <input
              type="text"
              value={filters.q || ""}
              onChange={(e) => onChange({ q: e.target.value })}
              placeholder="Search by hostel name, city or address"
              className="w-full text-sm text-[#1B2333] placeholder:text-gray-400 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* City */}
        <div className="relative flex items-center gap-3 rounded-xl bg-white border border-[#F0E1D5] px-4 py-3 overflow-visible">
          <MapPin className="w-5 h-5 text-[#F5732C] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-gray-500 leading-tight">
              Select City
            </div>
            <select
              value={filters.city || ""}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full text-sm text-[#1B2333] bg-transparent outline-none pr-6"
            >
              <option value="">All cities</option>
              {cities.map((c) => (
                <option key={c.value || c} value={c.value || c}>
                  {c.label || c}
                </option>
              ))}
            </select>
          </div>
          {/* <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}
        </div>

        {/* Move-in Date */}
        <div className="flex items-center gap-3 rounded-xl bg-white border border-[#F0E1D5] px-4 py-3">
          <Calendar className="w-5 h-5 text-[#F5732C] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-gray-500 leading-tight">
              Move-in Date
            </div>
            <input
              type="date"
              value={filters.moveInDate || ""}
              onChange={(e) => onChange({ moveInDate: e.target.value })}
              className="w-full text-sm text-[#1B2333] bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Budget */}
        {/* Budget */}
        <div className="relative flex items-center gap-3 rounded-xl bg-white border border-[#F0E1D5] px-4 py-3">
          <Wallet className="w-5 h-5 text-[#F5732C] flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-gray-500 leading-tight">
              Budget Range
            </div>

            <select
              value={`${filters.minPrice || 0}-${filters.maxPrice || 0}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split("-");
                onChange({
                  minPrice: Number(min),
                  maxPrice: Number(max),
                });
              }}
              className="w-full text-sm text-[#1B2333] bg-transparent outline-none pr-6"
            >
              <option value="0-0">Select Budget</option>
              <option value="0-5000">Up to RS5,000</option>
              <option value="5000-10000">RS 5,000 - RS10,000</option>
              <option value="10000-15000">RS 10,000 - RS15,000</option>
              <option value="15000-20000">RS 15,000 - RS20,000</option>
              <option value="20000-100000">RS 20,000+</option>
            </select>
          </div>
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
