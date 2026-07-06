import Joi from "joi";

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),

  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm Password is required",
      "any.only": "Passwords do not match",
      "any.required": "Confirm Password is required",
    }),
}).options({
  abortEarly: false,
  allowUnknown: false,
});