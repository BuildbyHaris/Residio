import { useState } from "react";
import { Send } from "lucide-react";
import StarRating from "./StarRating";

const ReviewForm = ({
  onSubmit,
  loading = false,
  initialRating = 0,
  initialComment = "",
  isEditing = false,
  onCancel,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!rating || rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }

    if (comment.length > 500) {
      setError("Comment cannot exceed 500 characters.");
      return;
    }

    try {
      await onSubmit({
        rating,
        comment: comment.trim(),
      });

      if (!isEditing) {
        setRating(0);
        setComment("");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to submit review."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#EDEDED] rounded-2xl p-5"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#1B2333]">
          {isEditing ? "Update Your Review" : "Write a Review"}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Share your experience about this hostel.
        </p>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#1B2333] mb-2">
          Your Rating
        </label>

        <StarRating
          value={rating}
          onChange={setRating}
          size={24}
        />

        {rating > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            You selected {rating} out of 5 stars.
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label
          htmlFor="review-comment"
          className="block text-sm font-semibold text-[#1B2333] mb-2"
        >
          Your Comment
        </label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your experience..."
          maxLength={500}
          rows={4}
          className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm outline-none resize-none focus:border-[#F5732C]"
        />

        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400">
            {comment.length}/500
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-[#F5732C] hover:bg-[#E5631D] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
        >
          <Send className="w-4 h-4" />

          {loading
            ? "Submitting..."
            : isEditing
            ? "Update Review"
            : "Submit Review"}
        </button>

        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="text-sm font-semibold text-gray-600 hover:text-gray-800 px-4 py-2.5"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;