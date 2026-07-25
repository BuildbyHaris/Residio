import React, { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { navLinks } from '../data/navLinks';
import NavLink from './NavLink';
import LocationSelector from './LocationSelector';
import Button from './Button';
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-white border-b border-border-light sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-xl text-ink-900">Residio</span>
      </div>

      {/* Center: Nav Links (desktop) */}
      <div className="hidden lg:flex items-center gap-6">
        {navLinks.map(function (link) {
          return (
            <NavLink
              key={link.label}
              label={link.label}
              href={link.href}
              active={link.active}
            />
          );
        })}
      </div>

      {/* Right: Location + Auth */}
      <div className="hidden lg:flex items-center gap-4">
        <LocationSelector />

        {isAuthenticated ? (
          <ProfileDropdown />
        ) : (
          <>
            <Link
              to="/login"
              className="text-ink-700 font-medium text-sm hover:text-brand-orange transition-colors"
            >
              Log in
            </Link>

            <Link to="/register">
              <Button variant="primary">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-2 text-ink-700 hover:text-brand-orange transition-colors"
        onClick={function () { setMobileMenuOpen(!mobileMenuOpen); }}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-border-light shadow-lg lg:hidden z-50">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map(function (link) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium ${link.active ? 'text-brand-orange' : 'text-ink-700'
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
            <hr className="border-border-light" />

            <LocationSelector />

            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-ink-700 font-medium text-sm hover:text-brand-orange transition-colors"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="primary" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;