const Joi = require("joi");

const verifyEmailValidation = Joi.object({
  token: Joi.string()
    .trim()
    .length(64)
    .hex()
    .required()
    .messages({
      "string.base": "Token must be a string.",
      "string.empty": "Verification token is required.",
      "string.length": "Verification token must be 64 characters long.",
      "string.hex": "Verification token must be a valid hexadecimal string.",
      "any.required": "Verification token is required.",
    }),
});

const resendVerificationValidation = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .max(255)
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email address.",
      "string.max": "Email must not exceed 255 characters.",
      "any.required": "Email is required.",
    }),
});

module.exports = {
  verifyEmailValidation,
  resendVerificationValidation,
};