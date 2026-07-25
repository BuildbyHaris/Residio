import React from 'react';
import { Home, Search, ShieldCheck, Headphones, CalendarCheck, MapPin } from 'lucide-react';

var iconMap = {
  Home: Home,
  Search: Search,
  ShieldCheck: ShieldCheck,
  Headphones: Headphones,
  CalendarCheck: CalendarCheck,
  MapPin: MapPin,
};

function IconChip({ icon, size = 'lg' }) {
  var IconComponent = iconMap[icon] || Home;
  var sizeClasses = size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  var iconSize = size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';

  return (
    <div className={`${sizeClasses} rounded-full bg-brand-peachLight flex items-center justify-center`}>
      <IconComponent className={`${iconSize} text-brand-orange`} />
    </div>
  );
}

export default IconChip;