import Joi from "joi";

export const resetPasswordValidationSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]+$/
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 32 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of these symbols: @ # $ % ^ & * !",
    }),
}).options({
  abortEarly: false,
  allowUnknown: false,
});