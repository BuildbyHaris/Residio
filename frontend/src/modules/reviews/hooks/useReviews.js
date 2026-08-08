import { useCallback, useEffect, useState } from "react";
import { reviewApi } from "../api/review.api.js";

export const useReviews = (hostelId) => {
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ==========================================
  // Get all reviews of hostel
  // ==========================================

  const fetchReviews = useCallback(async () => {
    if (!hostelId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await reviewApi.getByHostel(hostelId);

      if (response.data?.success) {
        setReviews(response.data.data || []);
      } else {
        setReviews([]);
        setError(
          response.data?.message || "Unable to load reviews."
        );
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  }, [hostelId]);

  // ==========================================
  // Get logged-in user's review
  // ==========================================

  const fetchMyReview = useCallback(async () => {
    if (!hostelId) return;

    try {
      const response = await reviewApi.getMyReview(hostelId);

      if (response.data?.success) {
        setMyReview(response.data.data || null);
      }
    } catch (err) {
      // If user is not logged in or has no review,
      // don't break the complete reviews page.
      setMyReview(null);
    }
  }, [hostelId]);

  // ==========================================
  // Initial fetch
  // ==========================================

  useEffect(() => {
    fetchReviews();
    fetchMyReview();
  }, [fetchReviews, fetchMyReview]);

  // ==========================================
  // Create Review
  // ==========================================

  const createReview = async (data) => {
    if (!hostelId) {
      throw new Error("Hostel ID is required.");
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await reviewApi.create({
        hostel: hostelId,
        rating: data.rating,
        comment: data.comment,
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Unable to create review."
        );
      }

      await fetchReviews();
      await fetchMyReview();

      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to create review.";

      setError(message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // Update Review
  // ==========================================

  const updateReview = async (reviewId, data) => {
    if (!reviewId) {
      throw new Error("Review ID is required.");
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await reviewApi.update(reviewId, {
        rating: data.rating,
        comment: data.comment,
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Unable to update review."
        );
      }

      await fetchReviews();
      await fetchMyReview();

      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to update review.";

      setError(message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // Delete Review
  // ==========================================

  const deleteReview = async (reviewId) => {
    if (!reviewId) {
      throw new Error("Review ID is required.");
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await reviewApi.remove(reviewId);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Unable to delete review."
        );
      }

      await fetchReviews();
      await fetchMyReview();

      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to delete review.";

      setError(message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    reviews,
    myReview,
    loading,
    submitting,
    error,
    fetchReviews,
    fetchMyReview,
    createReview,
    updateReview,
    deleteReview,
  };
};