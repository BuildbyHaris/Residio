import {
  createReviewService,
  getHostelReviewsService,
  getMyReviewService,
  updateReviewService,
  deleteReviewService,
  getLatestReviewsService,
} from "../services/review.service.js";


// ==============================
// Create Review
// ==============================

export const createReview = async (
  req,
  res,
  next
) => {

  console.log("CREATE REVIEW CONTROLLER HIT");
console.log(req.body);
console.log(req.user);


  try {

    const review =
      await createReviewService(
        req.user._id,
        req.body.hostel,
        req.body.rating,
        req.body.comment
      );

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });

  }

  catch (error) {

    next(error);

  }

};



// ==============================
// Get Hostel Reviews
// ==============================

export const getHostelReviews =
  async (
    req,
    res,
    next
  ) => {

    try {

      const reviews =
        await getHostelReviewsService(
          req.params.hostelId
        );

      return res.status(200).json({
        success: true,
        data: reviews,
      });

    }

    catch (error) {

      next(error);

    }

  };



// ==============================
// Get My Review
// ==============================

export const getMyReview =
  async (
    req,
    res,
    next
  ) => {

    try {

      const review =
        await getMyReviewService(
          req.user._id,
          req.params.hostelId
        );

      return res.status(200).json({
        success: true,
        data: review,
      });

    }

    catch (error) {

      next(error);

    }

  };



// ==============================
// Update Review
// ==============================

export const updateReview =
  async (
    req,
    res,
    next
  ) => {

    try {

      const review =
        await updateReviewService(
          req.params.reviewId,
          req.user._id,
          req.body.rating,
          req.body.comment
        );

      return res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: review,
      });

    }

    catch (error) {

      next(error);

    }

  };



// ==============================
// Delete Review
// ==============================

export const removeReview =
  async (
    req,
    res,
    next
  ) => {

    try {

      await deleteReviewService(
        req.params.reviewId,
        req.user._id
      );

      return res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });

    }

    catch (error) {

      next(error);

    }

  };

  // ==============================
// Get Latest Reviews for Home Page
// ==============================

export const getLatestReviews =
async (
  req,
  res,
  next
) => {

  try {

    const limit =
      Number(req.query.limit) || 6;

    const reviews =
      await getLatestReviewsService(limit);

    return res.status(200).json({
      success: true,
      data: reviews,
    });

  } catch (error) {

    next(error);

  }

};