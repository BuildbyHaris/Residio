import Joi from "joi";

export const adminLoginValidationSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email.",
      "any.required": "Email is required.",
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters.",
      "any.required": "Password is required.",
    }),
});

/**
 * Reject Owner Verification Validation
 */
export const rejectOwnerVerificationValidation = Joi.object({
  rejectionReason: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .required()
    .messages({
      "string.empty": "Rejection reason is required.",
      "string.min":
        "Rejection reason must be at least 10 characters.",
      "string.max":
        "Rejection reason cannot exceed 500 characters.",
      "any.required":
        "Rejection reason is required.",
    }),
});