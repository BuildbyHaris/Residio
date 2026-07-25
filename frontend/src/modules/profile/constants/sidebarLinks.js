import {
  User,
  CalendarDays,
  Heart,
  Star,
  CreditCard,
  Bell,
  Lock,
  RefreshCw,
  LogOut,
} from "lucide-react";

export const sidebarLinks = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "bookings", label: "My Bookings", icon: CalendarDays },
  { id: "wishlist", label: "Saved / Wishlist", icon: Heart },
  { id: "reviews", label: "My Reviews", icon: Star },
  { id: "payments", label: "Payments & Wallet", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security & Password", icon: Lock },
];

export const sidebarBottomLinks = [
  { id: "switch", label: "Switch to Seller", icon: RefreshCw, danger: false, isSwitch: true },
  { id: "logout", label: "Log Out", icon: LogOut, danger: true },
];