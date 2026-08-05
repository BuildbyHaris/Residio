// src/modules/findHostel/components/FindHostelFilters.jsx
import { MapPin, ChevronDown, Star } from "lucide-react";
import {
  SORT_OPTIONS,
  GENDER_OPTIONS,
  BUDGET_PRESETS,
  AMENITIES,
  RATING_OPTIONS,
  PRICE_RANGE,
} from "../constants/find.constants";

const FindHostelFilters = ({
  filters,
  cities = [],
  onChange,
  onReset,
  onApply,
}) => {
  const min = Number(filters.minPrice) || PRICE_RANGE.MIN;
  const max = Number(filters.maxPrice) || PRICE_RANGE.MAX;

  const toggleAmenity = (val) => {
    const current = Array.isArray(filters.amenities) ? filters.amenities : [];
    const next = current.includes(val)
      ? current.filter((a) => a !== val)
      : [...current, val];
    onChange({ amenities: next });
  };

  const isPresetActive = (p) =>
    Number(filters.minPrice) === p.min && Number(filters.maxPrice) === p.max;

  return (
    <aside className="bg-white border border-[#EDEDED] rounded-2xl p-5 h-fit">
      {/* City */}
      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#1B2333] mb-2">
          <MapPin className="w-4 h-4 text-[#F5732C]" /> City
        </label>
        <div className="relative">
          <select
            value={filters.city || ""}
            onChange={(e) => onChange({ city: e.target.value })}
            className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2.5 bg-white appearance-none pr-8 outline-none focus:border-[#F5732C]"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c.value || c} value={c.value || c}>
                {c.label || c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <div className="text-sm font-semibold text-[#1B2333] mb-3">
          Price Range
        </div>
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>RS. {min.toLocaleString()}</span>
          <span>
            RS. {max.toLocaleString()}
           {max >= PRICE_RANGE.MAX ? "+" : ""}
          </span>
        </div>
        <input
          type="range"
          min={PRICE_RANGE.MIN}
          max={PRICE_RANGE.MAX}
          step={500}
          value={max}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#F5732C]"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {BUDGET_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => onChange({ minPrice: p.min, maxPrice: p.max })}
              className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                isPresetActive(p)
                  ? "bg-[#FFF6F0] border-[#F5732C] text-[#F5732C]"
                  : "bg-white border-[#E5E7EB] text-gray-700 hover:border-[#F5732C]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-5">
        <div className="text-sm font-semibold text-[#1B2333] mb-2">Sort By</div>
        <div className="space-y-2">
          {SORT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
            >
              <input
                type="radio"
                name="sort"
                checked={filters.sort === opt.value}
                onChange={() => onChange({ sort: opt.value })}
                className="w-4 h-4 accent-[#F5732C]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Hostel Type */}
      <div className="mb-5">
        <div className="text-sm font-semibold text-[#1B2333] mb-2">
          Hostel Type
        </div>
        <div className="flex flex-wrap gap-4">
          {GENDER_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={filters.gender === opt.value}
                onChange={() =>
                  onChange({
                    gender: filters.gender === opt.value ? "" : opt.value,
                  })
                }
                className="w-4 h-4 accent-[#F5732C] rounded"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-5">
        <div className="text-sm font-semibold text-[#1B2333] mb-2">
          Amenities
        </div>
        <div className="grid grid-cols-2 gap-2">
          {AMENITIES.map((a) => {
            const checked = (filters.amenities || []).includes(a.value);
            return (
              <label
                key={a.value}
                className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 py-1"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAmenity(a.value)}
                  className="w-4 h-4 accent-[#F5732C] rounded"
                />
                <span className="truncate">{a.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <div className="text-sm font-semibold text-[#1B2333] mb-2">Rating</div>
        <div className="space-y-2">
          {RATING_OPTIONS.map((r) => (
            <label
              key={r.value}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={Number(filters.minRating) === r.value}
                onChange={() =>
                  onChange({
                    minRating:
                      Number(filters.minRating) === r.value ? 0 : r.value,
                  })
                }
                className="w-4 h-4 accent-[#F5732C] rounded"
              />
              <span className="flex items-center gap-1">
                {r.value}{" "}
                <Star className="w-3.5 h-3.5 fill-[#F5732C] text-[#F5732C]" />
                <span className="text-gray-600">& above</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#EDEDED]">
        <button
          onClick={onReset}
          className="text-sm font-semibold text-[#F5732C] hover:text-[#E5631D]"
        >
          Clear Filters
        </button>
        <button
          onClick={onApply}
          className="bg-[#F5732C] hover:bg-[#E5631D] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
};

export default FindHostelFilters;
