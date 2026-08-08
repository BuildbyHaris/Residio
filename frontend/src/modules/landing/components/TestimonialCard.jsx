import React from "react";
import RatingStars from "./RatingStars";

function TestimonialCard({
  quote,
  name,
  college,
  avatar,
  rating,
}) {
  return (
    <div className="bg-white rounded-xl2 border border-border-light p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <RatingStars rating={rating} />

        <span className="text-sm font-semibold text-ink-900">
          {Number(rating || 0).toFixed(1)}
        </span>
      </div>

      {/* Review */}
      <p className="text-sm text-ink-700 leading-6 mb-4 line-clamp-4">
        {quote || "No comment provided."}
      </p>

      {/* Student */}
      <div className="flex items-center gap-3">
        <img
          src={
            avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              name || "Student"
            )}`
          }
          alt={name || "Student"}
          className="w-9 h-9 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-semibold text-ink-900">
            {name || "Student"}
          </p>

          {college && (
            <p className="text-xs text-ink-500">
              {college}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;