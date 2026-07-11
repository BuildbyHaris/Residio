import React from 'react';
import { Check } from 'lucide-react';

function Badge({ label = 'Verified' }) {
  return (
    <span className="bg-brand-orange text-white text-xs font-medium px-2 py-1 rounded-md inline-flex items-center gap-1">
      <Check className="w-3 h-3" />
      {label}
    </span>
  );
}

export default Badge;