import React from 'react';
import IconChip from './IconChip';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <IconChip icon={icon} size="lg" />
      <h3 className="mt-4 font-bold text-ink-900 text-sm md:text-base">{title}</h3>
      <p className="mt-2 text-ink-500 text-xs md:text-sm max-w-[200px]">{description}</p>
    </div>
  );
}

export default FeatureCard;