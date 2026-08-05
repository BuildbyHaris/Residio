// src/modules/findHostel/constants/find.constants.js

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price_low", label: "Price Low to High" },
  { value: "price_high", label: "Price High to Low" },
];

export const GENDER_OPTIONS = [
  { value: "Boys", label: "Boys" },
  { value: "Girls", label: "Girls" },
  { value: "Co-ed", label: "Co-ed" },
];

export const BUDGET_PRESETS = [
  { label: "Under RS 5,000", min: 0, max: 5000 },
  { label: "RS5,000 – RS 10,000", min: 5000, max: 10000 },
  { label: "RS 10,000+", min: 10000, max: 100000 },
];

export const AMENITIES = [
  {
    value: "WiFi",
    label: "WiFi",
    icon: "Wifi",
  },
  {
    value: "Food",
    label: "Food",
    icon: "Utensils",
  },
  {
    value: "Laundry",
    label: "Laundry",
    icon: "Shirt",
  },
  {
    value: "Parking",
    label: "Parking",
    icon: "ParkingCircle",
  },
  {
    value: "AC",
    label: "AC",
    icon: "Snowflake",
  },
  {
    value: "Security",
    label: "Security",
    icon: "Shield",
  },
  {
    value: "Power Backup",
    label: "Power Backup",
    icon: "Zap",
  },
  {
    value: "Hot Water",
    label: "Hot Water",
    icon: "Droplet",
  },
];

export const RATING_OPTIONS = [
  { value: 4, label: "4 ★ & above" },
  { value: 3, label: "3 ★ & above" },
];

export const PRICE_RANGE = {
  MIN: 3000,
  MAX: 20000,
};

// Required by useFindHostel.js
export const DEFAULT_FILTERS = {
  search: "",
  city: "",
  gender: "",
  roomType: "",
  minPrice: "",
  maxPrice: "",
  availability: "",
  amenities: [],
  minRating: "",
  moveInDate: "",
  sort: "newest",
  page: 1,
  limit: 6,
};
