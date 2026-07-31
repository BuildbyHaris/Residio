import React, { useState, useEffect } from "react";
import {
  GENDER_OPTIONS,
  SORT_OPTIONS,
  AMENITIES,
  RATING_OPTIONS,
  CITY_OPTIONS,
  DEFAULT_FILTERS,
} from "../constants/find.constants.js";

const FindHostelFilters = ({ filters, onApply, onReset }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setLocalFilters((prev) => {
      const current = prev.amenities || [];
      const updated = current.includes(amenity)
        ? current.filter((a) => a !== amenity)
        : [...current, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const handleRatingToggle = (rating) => {
    setLocalFilters((prev) => {
      const current = prev.minRating || 0;
      // If same rating, uncheck it
      if (current === rating) {
        return { ...prev, minRating: "" };
      }
      return { ...prev, minRating: rating };
    });
  };

  // ✅ Handle budget preset selection
  const handleBudgetPreset = (min, max) => {
    setLocalFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max === Infinity ? "" : max,
    }));
  };

  const handleApply = () => {
    const cleaned = {};
    for (const key in localFilters) {
      const val = localFilters[key];
      if (val !== "" && val !== null && val !== undefined) {
        cleaned[key] = val;
      }
    }
    onApply(cleaned);
  };

  const handleReset = () => {
    const defaultValues = { ...DEFAULT_FILTERS };
    setLocalFilters(defaultValues);
    onReset(defaultValues);
  };

  return (
<div className="bg-white p-5 rounded-lg shadow-md space-y-5">      <h2 className="text-xl font-bold text-gray-800">Filters</h2>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <select
          value={localFilters.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Cities</option>
          {CITY_OPTIONS.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* ✅ Price Range – Preset List */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
        <div className="space-y-1 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="budget"
              checked={localFilters.minPrice === "" && localFilters.maxPrice === ""}
              onChange={() => handleBudgetPreset("", "")}
            />
            All
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="budget"
              checked={localFilters.minPrice === "0" && localFilters.maxPrice === "5000"}
              onChange={() => handleBudgetPreset(0, 5000)}
            />
            Under ₹5,000
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="budget"
              checked={localFilters.minPrice === "5000" && localFilters.maxPrice === "10000"}
              onChange={() => handleBudgetPreset(5000, 10000)}
            />
            ₹5,000 - ₹10,000
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="budget"
              checked={localFilters.minPrice === "10000" && localFilters.maxPrice === ""}
              onChange={() => handleBudgetPreset(10000, Infinity)}
            />
            ₹10,000+
          </label>
        </div>
      </div>

      {/* ✅ Sort By – Radio Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <div className="space-y-1 text-sm">
          {SORT_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={localFilters.sort === option.value}
                onChange={() => handleChange("sort", option.value)}
                className="accent-blue-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* ✅ Hostel Type – Checkboxes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Type</label>
        <div className="space-y-1 text-sm">
          {GENDER_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.gender === option.value}
                onChange={() => {
                  if (localFilters.gender === option.value) {
                    handleChange("gender", "");
                  } else {
                    handleChange("gender", option.value);
                  }
                }}
                className="accent-blue-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Amenities – Checkbox Grid */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
        <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto border border-gray-200 rounded p-2">
          {AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.amenities?.includes(amenity) || false}
                onChange={() => handleAmenityToggle(amenity)}
                className="accent-blue-600"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* ✅ Rating – Checkboxes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="space-y-1 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.minRating === "4"}
              onChange={() => handleRatingToggle(4)}
              className="accent-blue-600"
            />
            4 ★ & above
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.minRating === "3"}
              onChange={() => handleRatingToggle(3)}
              className="accent-blue-600"
            />
            3 ★ & above
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-md transition"
        >
          Clear Filters
        </button>
        <button
          onClick={handleApply}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default React.memo(FindHostelFilters);