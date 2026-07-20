// src/routes/paths.js

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

  // Owner
  OWNER_DASHBOARD: "/owner-dashboard",
  OWNER_PROPERTIES: "/owner/properties",
  ADD_PROPERTY: "/owner/properties/new",
  EDIT_PROPERTY: "/owner/properties/:id/edit",
  OWNER_BOOKINGS: "/owner/bookings",
  OWNER_ANALYTICS: "/owner/analytics",
  OWNER_REVIEWS: "/owner/reviews",
  OWNER_SETTINGS: "/owner/settings",

  // Admin
  ADMIN_DASHBOARD: "/admin",
  ADMIN_OWNER_VERIFICATIONS: "/admin/owner-verifications",
  ADMIN_PROPERTY_APPROVALS: "/admin/property-approvals",
  ADMIN_USERS: "/admin/users",
  ADMIN_PROPERTIES: "/admin/properties",
  ADMIN_BOOKINGS: "/admin/bookings",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
  ADMIN_SETTINGS: "/admin/settings",
};