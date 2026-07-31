// Gender Options
export const GENDER_OPTIONS = [
  { label: "All", value: "" },
  { label: "Boys", value: "Boys" },
  { label: "Girls", value: "Girls" },
  { label: "Co-ed", value: "Co-ed" },
];

// Room Type Options
export const ROOM_TYPE_OPTIONS = [
  { label: "All", value: "" },
  { label: "Single", value: "Single" },
  { label: "Double", value: "Double" },
  { label: "Triple", value: "Triple" },
  { label: "Dormitory", value: "Dormitory" },
];

// Sort Options
export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "price_low" },
  { label: "Price: High to Low", value: "price_high" },
  { label: "Highest Rated", value: "highest_rated" }, // ✅ Added as per design
];

// ✅ DEFAULT_FILTERS – used by useFindHostel
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
  limit: 6, // 6 per page as per design
};

// ✅ AMENITIES – used by HostelFilters
export const AMENITIES = [
  "WiFi",
  "Laundry",
  "Food / Mess",
  "Parking",
  "AC",
  "24/7 Security",
  "Power Backup",
  "CCTV Surveillance",
  "Study Room",
  "RO Water",
  "TV / Common Lounge",
  "Elevator",
];

// ✅ RATING_OPTIONS – used by HostelFilters
export const RATING_OPTIONS = [
  { label: "4 ★ & above", value: 4 },
  { label: "3 ★ & above", value: 3 },
];

// ✅ CITY_OPTIONS – used by HostelFilters
export const CITY_OPTIONS = [
    "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Sargodha",
  "Bahawalpur",
  "Sukkur",
  "Hyderabad",
  "Abbottabad",
  "Mardan",
  "Sheikhupura",
  "Gujrat",
  "Rahim Yar Khan",
  "Mingora",
];

// Budget ranges for dropdown
export const BUDGET_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
  { label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 – ₹15,000", min: 10000, max: 15000 },
  { label: "₹15,000+", min: 15000, max: Infinity },
];
