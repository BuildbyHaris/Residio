import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import {
  Home,
  Building2,
  PlusCircle,
  CalendarCheck,
  MessageSquare,
  Star,
  Wallet,
  Bell,
  Lock,
  RefreshCw,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard Overview",
    icon: Home,
    path: "/owner-dashboard",
  },
  {
    label: "My Properties",
    icon: Building2,
    path: "/owner-dashboard/properties",
  },
  {
    label: "Add New Property",
    icon: PlusCircle,
    path: "/owner-dashboard/add-property",
  },
  {
    label: "Bookings & Requests",
    icon: CalendarCheck,
    path: null,
  },
  {
    label: "Messages / Enquiries",
    icon: MessageSquare,
    path: null,
  },
  {
    label: "Reviews & Ratings",
    icon: Star,
    path: null,
  },
  {
    label: "Earnings & Payouts",
    icon: Wallet,
    path: null,
  },
  {
    label: "Notifications",
    icon: Bell,
    path: null,
  },
  {
    label: "Security & Password",
    icon: Lock,
    path: null,
  },
];

const OwnerSidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-4 flex flex-col">
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          // Items without routes
          if (!item.path) {
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.label === "Dashboard Overview"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 pt-3 space-y-1">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-orange-500 hover:bg-orange-50"
        >
          <RefreshCw size={18} />
          Switch to Buyer
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default OwnerSidebar;