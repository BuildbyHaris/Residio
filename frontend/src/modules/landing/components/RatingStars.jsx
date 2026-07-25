import React from 'react';
import { Star } from 'lucide-react';

function RatingStars({ rating, reviewCount }) {
  var fullStars = Math.floor(rating);
  var hasHalf = rating - fullStars >= 0.3;
  var totalStars = 5;

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm font-semibold text-ink-900">{rating}</span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: totalStars }).map(function (_, i) {
          return (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < fullStars
                  ? 'text-brand-orange fill-brand-orange'
                  : i === fullStars && hasHalf
                  ? 'text-brand-orange fill-brand-orange/50'
                  : 'text-border-light fill-border-light'
              }`}
            />
          );
        })}
      </div>
      <span className="text-xs text-ink-500">({reviewCount})</span>
    </div>
  );
}

export default RatingStars;