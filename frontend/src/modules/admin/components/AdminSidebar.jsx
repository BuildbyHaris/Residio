import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineLogout, HiX } from 'react-icons/hi';
import { adminNavLinks, adminBottomLinks } from '../constants/adminNavLinks';
import { logoutAdmin } from '../services/admin.service';
import toast from 'react-hot-toast';

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/admin/dashboard') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (link) => {
    if (link.comingSoon) {
      toast(`${link.label} is coming soon!`, { icon: '🚧' });
      return;
    }
    if (link.path) {
      navigate(link.path);
      onClose?.();
    }
  };

  const handleLogout = async () => {
    onClose?.();
    await logoutAdmin();
    toast.success('Logged out successfully.');
    navigate('/admin/login', { replace: true });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
          <div className="w-9 h-9 bg-[#ec6a52] rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-[#1e293b] text-lg leading-none">Residio</h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close sidebar"
        >
          <HiX className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {adminNavLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);

          return (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${active
                  ? 'bg-orange-50 text-[#ec6a52]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
                ${link.comingSoon ? 'opacity-60' : ''}
              `}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-[#ec6a52]' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <span className="flex-1 text-left">{link.label}</span>
              {link.comingSoon && (
                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Logout */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        {adminBottomLinks.map((link) => (
          <button
            key={link.id}
            onClick={link.isLogout ? handleLogout : () => handleNavClick(link)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <HiOutlineLogout className="w-5 h-5" />
            <span>{link.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:min-h-screen bg-white border-r border-gray-100 fixed left-0 top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Sidebar */}
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;