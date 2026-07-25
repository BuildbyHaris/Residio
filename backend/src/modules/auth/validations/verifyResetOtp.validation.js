import Joi from "joi";

export const verifyResetOtpValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email.",
    }),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "OTP is required.",
      "string.length": "OTP must be exactly 6 digits.",
      "string.pattern.base": "OTP must contain only numbers.",
    }),
});
