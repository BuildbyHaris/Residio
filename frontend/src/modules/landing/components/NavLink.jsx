import React from 'react';

function NavLink({ label, href, active }) {
  return (
    <a
      href={href}
      className={`relative pb-1 text-sm font-medium transition-colors ${
        active
          ? 'text-brand-orange'
          : 'text-ink-700 hover:text-brand-orange'
      }`}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
      )}
    </a>
  );
}

export default NavLink;