import { createReviewValidationSchema } from "../validation/review.validation.js";

export const validateCreateReview = (req, res, next) => {
  const { error } = createReviewValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};