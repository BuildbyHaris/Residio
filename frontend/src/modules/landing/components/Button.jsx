import React from 'react';

function Button({ children, variant = "primary", className = "", onClick, type = "button", disabled = false, }) {
  const baseClasses = 'font-medium rounded-lg px-5 py-2.5 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer';

  const variants = {
    primary: 'bg-brand-orange hover:bg-brand-orangeDark text-white',
    outline: 'bg-white text-brand-orange border border-brand-orange hover:bg-brand-peachLight',
    ghost: 'bg-transparent text-ink-700 hover:text-brand-orange',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `}
    >
      {children}
    </button>
  );
}

export default Button;