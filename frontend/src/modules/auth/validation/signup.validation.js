import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(20)
    .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .required()
    .messages({
  "string.empty": "Password is required",
  "string.min": "Password must be at least 8 characters",
  "string.max": "Password cannot exceed 15 characters",
  "string.pattern.base":
    "Password must contain uppercase, lowercase, number and one special character.",
    }),
  email: Joi.string()
    .email({
      tlds: { allow: true },
    })
    .lowercase()
    .max(100)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  phone: Joi.string()
    .length(11)
    .pattern(/^03\d{9}$/)
    .required()
    .messages({
      "string.length": "Phone number must be 11 digits",
      "string.pattern.base": "Phone number must start with 03",
    }),
  password: Joi.string()
    .required()
    .min(8)
    .max(15)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+])[A-Za-z\d@#$%^&*()_+]{8,32}$/)
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.min": "Password must be at least 15 characters",
      "string.pattern.name": "Password must contain at least one {#name}",
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Please confirm your password",
    }),
});