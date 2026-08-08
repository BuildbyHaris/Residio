import Review from "../models/review.model.js";

// ===============================
// Create Review
// ===============================
export const createReview = (data) => {
  return Review.create(data);
};

// ===============================
// Find Review by User + Hostel
// ===============================
export const findReviewByUserAndHostel = (
  userId,
  hostelId
) => {
  return Review.findOne({
    user: userId,
    hostel: hostelId,
  });
};

// ===============================
// Find Review By ID
// ===============================
export const findReviewById = (
  reviewId
) => {
  return Review.findById(reviewId);
};

// ===============================
// Find Review By ID + User
// ===============================
export const findReviewByIdWithUser = (
  reviewId
) => {
  return Review.findById(reviewId)
    .populate(
      "user",
      "name profileImage"
    );
};

// ===============================
// Get All Reviews of Hostel
// ===============================
export const findReviewsByHostel = (
  hostelId
) => {
  return Review.find({
    hostel: hostelId,
  })
    .populate(
      "user",
      "name profileImage"
    )
    .sort({
      createdAt: -1,
    });
};

// ===============================
// Get Logged In User Review
// ===============================
export const findUserReview = (
  userId,
  hostelId
) => {
  return Review.findOne({
    user: userId,
    hostel: hostelId,
  }).populate(
    "user",
    "name profileImage"
  );
};

// ===============================
// Get Hostel Reviews
// ===============================
export const getHostelReviews = (
  hostelId
) => {
  return Review.find({
    hostel: hostelId,
  });
};

// ===============================
// Save Review
// ===============================
export const saveReview = (
  review
) => {
  return review.save();
};

// ===============================
// Delete Review
// ===============================
export const deleteReview = (
  review
) => {
  return review.deleteOne();
};

// ===============================
// Get Latest Reviews for Home Page
// ===============================
export const getLatestReviews = (limit = 6) => {
  return Review.find({})
    .populate("user", "name profileImage")
    .populate("hostel", "name city")
    .sort({
      createdAt: -1,
    })
    .limit(limit);
};