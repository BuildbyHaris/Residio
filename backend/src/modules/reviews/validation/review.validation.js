import Joi from "joi";

export const createReviewValidationSchema = Joi.object({
  hostel: Joi.string().required().messages({
    "string.empty": "Hostel ID is required",
    "any.required": "Hostel ID is required",
  }),

  rating: Joi.number()
    .required()
    .min(1)
    .max(5)
    .messages({
      "number.base": "Rating must be a number",
      "any.required": "Rating is required",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating cannot exceed 5",
    }),

  comment: Joi.string()
    .trim()
    .max(500)
    .allow("")
    .messages({
      "string.max": "Comment cannot exceed 500 characters",
    }),
});