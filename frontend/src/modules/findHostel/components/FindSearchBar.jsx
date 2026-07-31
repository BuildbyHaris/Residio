import React, { useState } from "react";
import { CITY_OPTIONS, BUDGET_RANGES } from "../constants/find.constants.js";

const FindSearchBar = ({ initialFilters = {}, onSearch }) => {
  // ✅ Default empty object agar undefined ho
  const [localFilters, setLocalFilters] = useState({
    search: initialFilters.search || "",
    city: initialFilters.city || "",
    moveInDate: initialFilters.moveInDate || "",
    budgetRange: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleBudgetChange = (e) => {
    const index = e.target.value;
    if (index === "") {
      setLocalFilters((prev) => ({
        ...prev,
        budgetRange: "",
        minPrice: "",
        maxPrice: "",
      }));
      return;
    }
    const range = BUDGET_RANGES[index];
    if (range) {
      setLocalFilters((prev) => ({
        ...prev,
        budgetRange: index,
        minPrice: range.min === 0 ? "" : range.min,
        maxPrice: range.max === Infinity ? "" : range.max,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { search, city, moveInDate, minPrice, maxPrice } = localFilters;
    const filters = {};
    if (search) filters.search = search;
    if (city) filters.city = city;
    if (moveInDate) filters.moveInDate = moveInDate;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg flex flex-wrap items-end gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-medium text-gray-600 mb-1">Search</label>
        <input
          type="text"
          placeholder="Search locality, area or landmark"
          value={localFilters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="min-w-[150px]">
        <label className="block text-xs font-medium text-gray-600 mb-1">Select City</label>
        <select
          value={localFilters.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Cities</option>
          {CITY_OPTIONS.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="min-w-[150px]">
        <label className="block text-xs font-medium text-gray-600 mb-1">Move-in Date</label>
        <input
          type="date"
          value={localFilters.moveInDate}
          onChange={(e) => handleChange("moveInDate", e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="min-w-[180px]">
        <label className="block text-xs font-medium text-gray-600 mb-1">Budget Range</label>
        <select
          value={localFilters.budgetRange}
          onChange={handleBudgetChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {BUDGET_RANGES.map((range, index) => (
            <option key={index} value={index}>{range.label}</option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
          Search
        </button>
      </div>
    </form>
  );
};

// ✅ Ensure correct export name
export default React.memo(FindSearchBar)