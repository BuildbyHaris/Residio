import {
  CalendarDays,
  Home,
  Heart,
  Star,
} from "lucide-react";

export const statsConfig = [
  {
    key: "totalBookings",
    label: "Total Bookings",
    icon: CalendarDays,
  },
  {
    key: "activeBookings",
    label: "Active Bookings",
    icon: Home,
  },
  {
    key: "wishlistItems",
    label: "Wishlist Items",
    icon: Heart,
  },
  {
    key: "reviewsGiven",
    label: "Reviews Given",
    icon: Star,
  },
];

export const BUYER_STATS = {
  totalBookings: 0,
  activeBookings: 0,
  wishlistItems: 0,
  reviewsGiven: 0,
};

export const OWNER_STATS = {
  totalBookings: 0,
  activeBookings: 0,
  wishlistItems: 0,
  reviewsGiven: 0,
};