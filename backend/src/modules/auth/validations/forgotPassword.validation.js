import Joi from "joi";

export const forgotPasswordValidationSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .max(100)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "string.max": "Email cannot exceed 100 characters",
      "any.required": "Email is required",
    }),
}).options({
  abortEarly: false,
  allowUnknown: false,
});