import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews = [], loading, error }) => {
  if (loading) {
    return (
      <div className="py-6 text-center text-sm text-gray-500">
        Loading reviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 text-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="border border-[#EDEDED] rounded-xl p-8 text-center">
        <p className="text-gray-500">
          No reviews yet.
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Be the first person to review this hostel.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
        />
      ))}
    </div>
  );
};

export default ReviewList;