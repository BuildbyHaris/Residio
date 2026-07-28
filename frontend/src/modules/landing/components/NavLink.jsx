import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

function NavLink({ label, href, onClick }) {
  return (
    <RouterNavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) =>
        `relative pb-1 text-sm font-medium transition-colors ${
          isActive
            ? "text-brand-orange"
            : "text-ink-700 hover:text-brand-orange"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}

          {isActive && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-orange" />
          )}
        </>
      )}
    </RouterNavLink>
  );
}

export default NavLink;