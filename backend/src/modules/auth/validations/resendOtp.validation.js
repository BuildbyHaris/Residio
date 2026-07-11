import Joi from "joi";

export const resendOtpValidationSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email",
      "any.required": "Email is required",
    }),
});