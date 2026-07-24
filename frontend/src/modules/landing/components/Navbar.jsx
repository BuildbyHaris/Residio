import React, { useState } from "react";
import { Home, Menu, X } from "lucide-react";
import { navLinks } from "../data/navLinks";
import NavLink from "./NavLink";
import LocationSelector from "./LocationSelector";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border-light bg-white px-6 py-4 md:px-10">

      {/* ============================================================
          Logo
      ============================================================ */}

      <Link
        to="/"
        className="flex items-center gap-2"
        aria-label="Go to Residio home"
        onClick={closeMobileMenu}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange">
          <Home className="h-4 w-4 text-white" />
        </div>

        <span className="text-xl font-bold text-ink-900">
          Residio
        </span>
      </Link>

      {/* ============================================================
          Desktop Navigation
      ============================================================ */}

      <div className="hidden items-center gap-6 lg:flex">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            label={link.label}
            href={link.href}
          />
        ))}
      </div>

      {/* ============================================================
          Desktop Right Section
      ============================================================ */}

      <div className="hidden items-center gap-4 lg:flex">

        <LocationSelector />

        {isAuthenticated ? (
          <ProfileDropdown />
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-ink-700 transition-colors hover:text-brand-orange"
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

      {/* ============================================================
          Mobile Menu Button
      ============================================================ */}

      <button
        type="button"
        aria-label={
          mobileMenuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        className="p-2 text-ink-700 transition-colors hover:text-brand-orange lg:hidden"
        onClick={() =>
          setMobileMenuOpen((prev) => !prev)
        }
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* ============================================================
          Mobile Menu
      ============================================================ */}

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-border-light bg-white shadow-lg lg:hidden">

          <div className="flex flex-col gap-4 p-6">

            {/* Mobile Navigation Links */}

            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                label={link.label}
                href={link.href}
                onClick={closeMobileMenu}
              />
            ))}

            <hr className="border-border-light" />

            {/* Location */}

            <LocationSelector />

            {/* Authentication */}

            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="text-sm font-medium text-ink-700 transition-colors hover:text-brand-orange"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                >
                  <Button
                    variant="primary"
                    className="w-full"
                  >
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