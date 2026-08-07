import api from "../../../services/api.js";

export const reviewApi = {
  // Create Review
  create: (data) => {
    return api.post("/reviews", data);
  },

  // Get all reviews of a hostel
  getByHostel: (hostelId) => {
    return api.get(`/reviews/hostel/${hostelId}`);
  },

  // Get logged-in user's review
  getMyReview: (hostelId) => {
    return api.get(`/reviews/my/${hostelId}`);
  },

  // Update review
  update: (reviewId, data) => {
    return api.put(`/reviews/${reviewId}`, data);
  },

  // Delete review
  remove: (reviewId) => {
    return api.delete(`/reviews/${reviewId}`);
  },
};