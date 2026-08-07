// src/modules/findHostel/components/ActiveFilterChips.jsx
import { X } from "lucide-react";
import { AMENITIES } from "../constants/find.constants";

const ActiveFilterChips = ({ filters, onChange, onClearAll }) => {
  const chips = [];

  if (filters.city)
    chips.push({ key: "city", label: filters.city, clear: { city: "" } });

  const min = Number(filters.minPrice) || 0;
  const max = Number(filters.maxPrice) || 0;
  if (min || max) {
    chips.push({
      key: "price",
      label: `RS${min.toLocaleString()} – RS${max.toLocaleString()}`,
      clear: { minPrice: 0, maxPrice: 0 },
    });
  }

  (filters.amenities || []).forEach((a) => {
    const found = AMENITIES.find((x) => x.value === a);
    chips.push({
      key: `amen-${a}`,
      label: found?.label || a,
      clear: { amenities: (filters.amenities || []).filter((x) => x !== a) },
    });
  });

  if (filters.gender)
    chips.push({ key: "gender", label: filters.gender, clear: { gender: "" } });
  if (Number(filters.minRating)) {
    chips.push({
      key: "rating",
      label: `${filters.minRating}★ & above`,
      clear: { minRating: 0 },
    });
  }

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.clear)}
          className="inline-flex items-center gap-1.5 bg-white border border-[#F5732C] text-[#F5732C] text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[#FFF6F0] transition"
        >
          {c.label}
          <X className="w-3 h-3" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs font-semibold text-[#F5732C] hover:text-[#E5631D] px-2"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilterChips;
