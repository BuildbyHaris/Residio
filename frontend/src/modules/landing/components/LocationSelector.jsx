import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

function LocationSelector({ location = 'Bangalore' }) {
  return (
    <button className="flex items-center gap-1.5 border border-border-light rounded-full px-3 py-1.5 text-sm text-ink-700 hover:border-brand-orange transition-colors cursor-pointer">
      <MapPin className="w-4 h-4 text-brand-orange" />
      <span>{location}</span>
      <ChevronDown className="w-3.5 h-3.5 text-ink-500" />
    </button>
  );
}

export default LocationSelector;