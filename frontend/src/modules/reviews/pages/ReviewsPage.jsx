import { useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import ReviewSummary from "../components/ReviewSummary";
import { useReviews } from "../hooks/useReviews";

const ReviewsPage = ({
  hostelId,
  currentUserId,
}) => {
  const {
    reviews,
    myReview,
    loading,
    submitting,
    error,
    createReview,
    updateReview,
    deleteReview,
  } = useReviews(hostelId);

  const [editingReview, setEditingReview] = useState(null);

  // ==========================================
  // Create Review
  // ==========================================

  const handleCreateReview = async (data) => {
    await createReview(data);
  };

  // ==========================================
  // Update Review
  // ==========================================

  const handleUpdateReview = async (data) => {
    if (!editingReview?._id) return;

    await updateReview(editingReview._id, data);

    setEditingReview(null);
  };

  // ==========================================
  // Delete Review
  // ==========================================

  const handleDeleteReview = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    await deleteReview(reviewId);

    if (editingReview?._id === reviewId) {
      setEditingReview(null);
    }
  };

  // ==========================================
  // Rating Summary
  // ==========================================

  const totalReviews = reviews.length;

  const calculatedRating =
    totalReviews > 0
      ? reviews.reduce(
          (sum, review) => sum + Number(review.rating || 0),
          0
        ) / totalReviews
      : 0;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B2333]">
          Hostel Reviews
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Reviews and ratings from hostel residents.
        </p>
      </div>

      {/* Backend Error */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-100 text-red-600 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Summary */}
      <div className="mb-6">
        <ReviewSummary
          rating={calculatedRating}
          reviewCount={totalReviews}
        />
      </div>

      {/* Review Form */}
      {editingReview ? (
        <div className="mb-6">
          <ReviewForm
            initialRating={editingReview.rating}
            initialComment={editingReview.comment}
            isEditing
            loading={submitting}
            onSubmit={handleUpdateReview}
            onCancel={() => setEditingReview(null)}
          />
        </div>
      ) : (
        !myReview && (
          <div className="mb-6">
            <ReviewForm
              loading={submitting}
              onSubmit={handleCreateReview}
            />
          </div>
        )
      )}

      {/* Reviews */}
      <div>
        <h2 className="text-lg font-bold text-[#1B2333] mb-4">
          All Reviews
        </h2>

        <ReviewList
          reviews={reviews}
          currentUserId={currentUserId}
          loading={loading}
          onEdit={setEditingReview}
          onDelete={handleDeleteReview}
        />
      </div>
    </section>
  );
};

export default ReviewsPage;