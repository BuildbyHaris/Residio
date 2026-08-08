import { Star } from "lucide-react";

const ReviewSummary = ({
  rating = 0,
  reviewCount = 0,
}) => {
  const safeRating = Number(rating) || 0;
  const safeReviewCount = Number(reviewCount) || 0;

  return (
    <div className="bg-white border border-[#EDEDED] rounded-2xl p-5">
      <div className="flex items-center gap-5">
        {/* Average Rating */}
        <div className="text-center min-w-[90px]">
          <div className="text-3xl font-bold text-[#1B2333]">
            {safeRating.toFixed(1)}
          </div>

          <div className="flex justify-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={
                  star <= Math.round(safeRating)
                    ? "w-4 h-4 fill-[#F5732C] text-[#F5732C]"
                    : "w-4 h-4 text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-1">
            {safeReviewCount}{" "}
            {safeReviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* Description */}
        <div className="border-l border-[#EDEDED] pl-5">
          <h3 className="text-lg font-semibold text-[#1B2333]">
            Hostel Reviews
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            See what other residents think about this hostel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;