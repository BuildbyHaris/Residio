import Hostel from "../../ownerDashboard/models/hostel.model.js";

import {
  createReview,
  findReviewByUserAndHostel,
  findReviewsByHostel,
  findReviewByIdWithUser,
  findUserReview,
  getHostelReviews,
  saveReview,
  deleteReview,
  getLatestReviews,
} from "../repositories/review.repository.js";

const checkStayVerification = async (userId, hostelId) => {

    // Abhi booking module available nahi hai
    // Isliye default false return kar rahe hain

    return false;
};

// =======================================
// Recalculate Hostel Rating
// =======================================

const updateHostelRating = async (hostelId) => {

  const hostel = await Hostel.findById(hostelId);

  if (!hostel) {
    throw new Error("Hostel not found");
  }

  const reviews = await getHostelReviews(hostelId);

  if (reviews.length === 0) {

    hostel.rating = 0;
    hostel.reviewCount = 0;

  } else {

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    hostel.rating = Number(
      (totalRating / reviews.length).toFixed(1)
    );

    hostel.reviewCount = reviews.length;
  }

  await hostel.save();
};


// =======================================
// Create Review
// =======================================

export const createReviewService = async (
    userId,
    hostelId,
    rating,
    comment
) => {

    // 1. Check Hostel Exists

    const hostel = await Hostel.findById(hostelId);

    if (!hostel) {
        throw new Error("Hostel not found");
    }


    // 2. Check Already Reviewed

    const alreadyReviewed =
        await findReviewByUserAndHostel(
            userId,
            hostelId
        );


    if (alreadyReviewed) {

        throw new Error(
            "You already reviewed this hostel"
        );

    }


    // 3. Check Stay Verification

    const isVerifiedStay =
        await checkStayVerification(
            userId,
            hostelId
        );


    // 4. Create Review

    const review = await createReview({

        hostel: hostelId,

        user: userId,

        rating,

        comment: comment || "",

        isVerifiedStay

    });


    // 5. Update Hostel Rating

    await updateHostelRating(
        hostelId
    );


    // 6. Return Review with User Data

    return await findReviewByIdWithUser(
        review._id
    );

};

// =======================================
// Get Hostel Reviews
// =======================================

export const getHostelReviewsService =
  async (hostelId) => {

    return await findReviewsByHostel(
      hostelId
    );

  };


// =======================================
// Get Logged In User Review
// =======================================

export const getMyReviewService =
  async (
    userId,
    hostelId
  ) => {

    return await findUserReview(
      userId,
      hostelId
    );

  };


// =======================================
// Update Review
// =======================================

export const updateReviewService =
  async (
    reviewId,
    userId,
    rating,
    comment
  ) => {

    const review =
      await findReviewByIdWithUser(
        reviewId
      );

    if (!review) {
      throw new Error(
        "Review not found"
      );
    }

    if (
      review.user._id.toString() !==
      userId.toString()
    ) {
      throw new Error(
        "Unauthorized"
      );
    }

    review.rating = rating;
    review.comment = comment;

    await saveReview(review);

    await updateHostelRating(
      review.hostel
    );

    return await findReviewByIdWithUser(
      reviewId
    );

  };


// =======================================
// Delete Review
// =======================================

export const deleteReviewService =
  async (
    reviewId,
    userId
  ) => {

    const review =
      await findReviewByIdWithUser(
        reviewId
      );

    if (!review) {
      throw new Error(
        "Review not found"
      );
    }

    if (
      review.user._id.toString() !==
      userId.toString()
    ) {
      throw new Error(
        "Unauthorized"
      );
    }

    const hostelId = review.hostel;

    await deleteReview(review);

    await updateHostelRating(
      hostelId
    );

    return;

  };

  // =======================================
// Get Latest Reviews for Home Page
// =======================================

export const getLatestReviewsService = async (limit = 6) => {
  return await getLatestReviews(limit);
};