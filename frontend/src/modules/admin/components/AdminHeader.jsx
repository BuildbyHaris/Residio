import React from 'react';
import { HiOutlineSearch, HiOutlineBell, HiOutlineMenu } from 'react-icons/hi';
import AdminProfileMenu from './AdminProfileMenu';

const AdminHeader = ({ admin, onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Left: Mobile menu + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <HiOutlineMenu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Brand - visible on mobile only */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 bg-[#ec6a52] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-[#1e293b] text-sm">Residio</span>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#ec6a52] focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="Search">
            <HiOutlineSearch className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notification Bell */}
          <button
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <HiOutlineBell className="w-5 h-5 text-gray-600" />
            {/* Badge - visual only, no fake count */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ec6a52] rounded-full" />
          </button>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-200" />

          {/* Profile Menu */}
          <AdminProfileMenu admin={admin} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;