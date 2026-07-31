export const GENDER_TYPES = ["Boys", "Girls", "Co-ed"];
export const ROOM_TYPES = ["Single", "Double", "Triple", "Dormitory"];
export const SORT_OPTIONS = {
  newest: { field: "createdAt", order: -1 },
  oldest: { field: "createdAt", order: 1 },
  price_low: { field: "minPrice", order: 1 },
  price_high: { field: "minPrice", order: -1 },
};
export const DEFAULT_LIMIT = 12;
export const MAX_LIMIT = 50;
export const ALLOWED_SORT_KEYS = Object.keys(SORT_OPTIONS);