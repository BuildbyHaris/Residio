import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  ChevronDown,
  Bell,
  User,
  Heart,
  LogOut,
} from "lucide-react";

function Navbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    "Home",
    "Find Hostels",
    "PGs",
    "How It Works",
    "About",
    "Contact",
  ];

  return (
    <header className="w-full bg-white shadow-sm h-18 flex items-center px-8 z-50 relative">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-10 flex-shrink-0">
        <div className="w-9 h-9 flex items-center justify-center">
          <svg
            viewBox="0 0 40 40"
            className="w-9 h-9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2L36.66 12V28L20 38L3.34 28V12L20 2Z"
              fill="#F5732C"
            />
            <path
              d="M20 12L28 17V27L20 32L12 27V17L20 12Z"
              fill="white"
            />
            <path
              d="M20 17L24 19.5V24.5L20 27L16 24.5V19.5L20 17Z"
              fill="#F5732C"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-gray-900">Residio</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden lg:flex items-center gap-7">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-gray-700 font-medium text-sm hover:text-[#F5732C] transition-colors whitespace-nowrap"
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-5">
        {/* Location pill */}
        <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:border-gray-300 transition-colors">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{user.location}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>

        {/* Bell */}
        <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          {user.notificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#F5732C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {user.notificationsCount}
            </span>
          )}
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-9 h-9 rounded-full ring-2 ring-[#F5732C]/40 object-cover"
            />
            <span className="text-sm font-medium text-gray-800 hidden md:block">
              {user.name}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FDEDE3] transition-colors">
                <User className="w-4 h-4 text-gray-500" />
                Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FDEDE3] transition-colors">
                <Heart className="w-4 h-4 text-gray-500" />
                Wishlist
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-[#FDEDE3] transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;