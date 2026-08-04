// src/modules/findHostel/constants/find.constants.js

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export const GENDER_OPTIONS = [
  { value: "boys", label: "Boys" },
  { value: "girls", label: "Girls" },
  { value: "coed", label: "Co-ed" },
];

export const BUDGET_PRESETS = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000+", min: 10000, max: 100000 },
];

export const AMENITIES = [
  { value: "wifi", label: "WiFi", icon: "Wifi" },
  { value: "laundry", label: "Laundry", icon: "Shirt" },
  { value: "food", label: "Food / Mess", icon: "Utensils" },
  { value: "parking", label: "Parking", icon: "ParkingCircle" },
  { value: "ac", label: "AC", icon: "Snowflake" },
  { value: "security", label: "24/7 Security", icon: "Shield" },
  { value: "power_backup", label: "Power Backup", icon: "Zap" },
  { value: "hot_water", label: "Hot Water", icon: "Droplet" },
  { value: "cctv", label: "CCTV Surveillance", icon: "Camera" },
  { value: "housekeeping", label: "Housekeeping", icon: "Sparkles" },
  { value: "study_room", label: "Study Room", icon: "BookOpen" },
  { value: "gym", label: "Gym", icon: "Dumbbell" },
  { value: "ro_water", label: "RO Water", icon: "GlassWater" },
  { value: "attached_bathroom", label: "Attached Bathroom", icon: "Bath" },
  { value: "tv", label: "TV / Common Lounge", icon: "Tv" },
  { value: "elevator", label: "Elevator", icon: "MoveVertical" },
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