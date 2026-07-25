import React from 'react';
import { Quote, Star } from 'lucide-react';

function TestimonialCard({ quote, name, college, avatar, rating }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-border-light overflow-hidden p-5">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-brand-orange mb-3" />

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: rating }).map(function (_, i) {
          return (
            <Star key={i} className="w-4 h-4 text-brand-orange fill-brand-orange" />
          );
        })}
      </div>

      {/* Review Text */}
      <p className="text-ink-700 text-sm leading-relaxed mb-4">{quote}</p>

      {/* Footer */}
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-ink-900 text-sm">{name}</p>
          <p className="text-ink-500 text-xs">{college}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;