import RatingStars from "./RatingStars";

const ReviewsSection = ({ reviews = [] }) => {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
      reviews.length
      : 0;
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl2 border border-border-light p-6">
        <h2 className="text-xl font-semibold text-ink-900 mb-3">
          Student Reviews
        </h2>

        <p className="text-sm text-ink-500">
          No reviews yet. Be the first to review this hostel.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-ink-900">
          What Students Say
        </h2>
        <a
          href="button"
          className="text-brand-orange text-sm font-semibold hover:underline"
        >
          View All Reviews →
        </a>
      </div>
      <div className="flex items-center gap-3 mb-5">
        <RatingStars rating={averageRating} />

        <span className="font-semibold text-ink-900">
          {averageRating.toFixed(1)}
        </span>

        <span className="text-sm text-ink-500">
          ({reviews.length} Reviews)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl2 border border-border-light p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 mb-3">
              <RatingStars rating={review.rating} />
              <span className="text-sm font-semibold text-ink-900">
                {review.rating.toFixed(1)}
              </span>
            </div>

            <p className="text-sm text-ink-700 leading-6 mb-4 line-clamp-4">
              {review.comment}
            </p>

            <div className="flex items-center gap-3">
              <img
                src={
                  review.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    review.studentName
                  )}`
                }
                alt={review.studentName}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  {review.studentName}
                </p>
                <p className="text-xs text-ink-500">
                  {review.studentInstitute}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
