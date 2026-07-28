export const GENDER_OPTIONS = [
  { label: "All", value: "" },
  { label: "Boys", value: "Boys" },
  { label: "Girls", value: "Girls" },
  { label: "Co-ed", value: "Co-ed" },
];

export const ROOM_TYPE_OPTIONS = [
  { label: "All", value: "" },
  { label: "Single", value: "Single" },
  { label: "Double", value: "Double" },
  { label: "Triple", value: "Triple" },
  { label: "Dormitory", value: "Dormitory" },
];

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price_low" },
  { label: "Price: High to Low", value: "price_high" },
];

export const DEFAULT_FILTERS = {
  search: "",
  gender: "",
  roomType: "",
  minPrice: "",
  maxPrice: "",
  availability: "",
  sort: "newest",
  page: 1,
  limit: 12,
};