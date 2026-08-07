import React, { useState } from "react";
import { Star } from "lucide-react";
import api from "../../../services/api.js";

function ReviewForm({ hostelId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!hostelId) {
      setError("Hostel ID is missing.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/reviews", {
        hostel: hostelId,
        rating,
        comment: comment.trim(),
      });

      if (response.data.success) {
        setSuccess("Review submitted successfully!");

        setRating(0);
        setComment("");

        if (onReviewSubmitted) {
          onReviewSubmitted(response.data.data);
        }
      }
    } catch (error) {
      console.error("Failed to submit review:", error);

      setError(
        error.response?.data?.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl2 border border-border-light p-5">
      <h3 className="text-lg font-semibold text-ink-900 mb-4">
        Write a Review
      </h3>

      {/* Rating */}
      <div className="mb-4">
        <p className="text-sm font-medium text-ink-700 mb-2">
          Your Rating
        </p>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-6 h-6 ${
                  star <= rating
                    ? "fill-[#F5732C] text-[#F5732C]"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label
          htmlFor="review-comment"
          className="block text-sm font-medium text-ink-700 mb-2"
        >
          Your Comment
        </label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          maxLength={500}
          rows={4}
          className="w-full border border-border-light rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F5732C] resize-none"
        />

        <div className="text-xs text-gray-400 text-right mt-1">
          {comment.length}/500
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 mb-3">
          {error}
        </p>
      )}

      {/* Success */}
      {success && (
        <p className="text-sm text-green-600 mb-3">
          {success}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="px-5 py-2.5 bg-[#F5732C] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}

export default ReviewForm;