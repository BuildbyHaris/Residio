import React from "react";
import { GENDER_OPTIONS, ROOM_TYPE_OPTIONS, SORT_OPTIONS } from "../constants/hostel.constants.js";

const HostelFilters = ({ filters, onChange, onReset }) => {
  const handleChange = (key, value) => {
  // ✅ Prevent negative numbers from being set
  if ((key === "minPrice" || key === "maxPrice") && Number(value) < 0) {
    return; // Do nothing
  }
  onChange({ [key]: value });
};
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select
          value={filters.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className="w-full border p-2 rounded"
        >
          {GENDER_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      {/* Room Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Room Type</label>
        <select
          value={filters.roomType}
          onChange={(e) => handleChange("roomType", e.target.value)}
          className="w-full border p-2 rounded"
        >
          {ROOM_TYPE_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      {/* Price */}
     <input
  type="number"
  placeholder="Min"
  value={filters.minPrice}
  onChange={(e) => handleChange("minPrice", e.target.value)}
  className="w-1/2 border p-2 rounded"
  min="0"   // ✅ Add this
/>
<input
  type="number"
  placeholder="Max"
  value={filters.maxPrice}
  onChange={(e) => handleChange("maxPrice", e.target.value)}
  className="w-1/2 border p-2 rounded"
  min="0"   // ✅ Add this
/>

      {/* Availability */}
      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={filters.availability === "true"} onChange={(e) => handleChange("availability", e.target.checked ? "true" : "")} />
          Show only available
        </label>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select value={filters.sort} onChange={(e) => handleChange("sort", e.target.value)} className="w-full border p-2 rounded">
          {SORT_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
      </div>

      <button onClick={onReset} className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300">Reset</button>
    </div>
  );
};
export default React.memo(HostelFilters);