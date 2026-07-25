import React from 'react';
import IconChip from './IconChip';

function StepCard({ stepNumber, icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Step Number Badge */}
      <div className="absolute -top-2 -left-1 md:left-auto md:-top-3 md:right-0 w-7 h-7 rounded-full bg-brand-orange text-white text-xs font-bold flex items-center justify-center z-10">
        {stepNumber}
      </div>

      <IconChip icon={icon} size="lg" />
      <h3 className="mt-4 font-bold text-ink-900 text-sm md:text-base">{title}</h3>
      <p className="mt-2 text-ink-500 text-xs md:text-sm max-w-[220px]">{description}</p>
    </div>
  );
}

export default StepCard;