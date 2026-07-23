import Joi from "joi";

export const registerValidationSchema = Joi.object({
  // Name
  name: Joi.string()
    .trim()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
      "string.min": "Name must be between 2 and 50 characters",
      "string.max": "Name must be between 2 and 50 characters",
      "string.pattern.base": "Name can only contain letters and single spaces",
    }),

  // Email
  email: Joi.string()
    .trim()
    .required()
    .email()
    .lowercase() // Joi's native equivalent to normalizeEmail
    .messages({
      "string.empty": "Email is required",
      "any.required": "Email is required",
      "string.email": "Please enter a valid email",
    }),

  // Phone
  phone: Joi.string()
    .trim()
    .required()
    .pattern(/^03\d{9}$/)
        .min(8)
    .max(11)
    .messages({
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
      "string.pattern.base": "Phone number must start with 03 and contain 11 digits.",
    }),

  // Password
  password: Joi.string()
  .min(8)
  .max(15)
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]+$/
  )
  .required()
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 15 characters",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of these symbols: @ # $ % ^ & * !",
  }),

  // Confirm Password
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm Password is required",
      "any.required": "Confirm Password is required",
      "any.only": "Passwords do not match",
    }),
});

