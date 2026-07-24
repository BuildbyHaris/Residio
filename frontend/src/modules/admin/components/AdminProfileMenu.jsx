import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout, HiChevronDown } from 'react-icons/hi';
import { logoutAdmin } from '../services/admin.service';
import toast from 'react-hot-toast';

const AdminProfileMenu = ({ admin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const adminName = admin?.name || admin?.fullName || 'Admin';
  const adminRole = admin?.role === 'admin' ? 'Super Admin' : 'Admin';
  const adminAvatar = admin?.avatar || admin?.profilePicture || null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logoutAdmin();
    toast.success('Logged out successfully.');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors"
        aria-label="Admin profile menu"
        aria-expanded={isOpen}
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ec6a52] to-[#e35a41] flex items-center justify-center overflow-hidden border-2 border-orange-100">
          {adminAvatar ? (
            <img src={adminAvatar} alt={adminName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-semibold text-sm">
              {adminName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Name & Role */}
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-[#1e293b] leading-tight">{adminName}</p>
          <p className="text-xs text-gray-500">{adminRole}</p>
        </div>

        <HiChevronDown className={`hidden md:block w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-[#1e293b]">{adminName}</p>
            <p className="text-xs text-gray-500">{adminRole}</p>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                toast('Profile settings coming soon!', { icon: '⚙️' });
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <HiOutlineUser className="w-4 h-4 text-gray-400" />
              Profile
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                toast('Settings coming soon!', { icon: '⚙️' });
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <HiOutlineCog className="w-4 h-4 text-gray-400" />
              Settings
            </button>
          </div>

          <div className="border-t border-gray-100 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <HiOutlineLogout className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfileMenu;