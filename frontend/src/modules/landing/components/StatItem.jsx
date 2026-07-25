import React from 'react';
import { ShieldCheck, Smile } from 'lucide-react';

var statIconMap = {
  'shield-check': ShieldCheck,
  'smile': Smile,
};

function StatItem({ icon, value, label }) {
  var IconComponent = statIconMap[icon] || ShieldCheck;

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-brand-peachLight flex items-center justify-center flex-shrink-0">
        <IconComponent className="w-5 h-5 text-brand-orange" />
      </div>
      <div>
        <p className="font-bold text-ink-900 text-lg">{value}</p>
        <p className="text-ink-500 text-xs">{label}</p>
      </div>
    </div>
  );
}

export default StatItem;