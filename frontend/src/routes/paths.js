export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_OTP: "/verify-otp",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_RESET_OTP: "/verify-reset-otp",
  RESET_PASSWORD: "/reset-password",

  // Profile
  PROFILE: "/profile",
  OWNER_VERIFICATION: "/owner-verification",

  // Buyer
  WISHLIST: "/wishlist",
  MY_BOOKINGS: "/my-bookings",

  // Find Hostel
  FIND_HOSTEL: "/find-hostel",
  HOSTEL_DETAIL: "/hostel/:id",

  // Owner
  OWNER_DASHBOARD: "/owner-dashboard",
  OWNER_PROPERTIES: "/owner-dashboard/properties",
  ADD_PROPERTY: "/owner-dashboard/add-property",
  EDIT_PROPERTY: "/owner-dashboard/properties/:id/edit",
  OWNER_BOOKINGS: "/owner-dashboard/bookings",
  OWNER_ANALYTICS: "/owner-dashboard/analytics",
  OWNER_REVIEWS: "/owner-dashboard/reviews",
  OWNER_SETTINGS: "/owner-dashboard/settings",

  // Admin
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_OWNER_VERIFICATIONS: "/admin/owner-verifications",

  // Chat
CHAT: "/chat/:conversationId",
};