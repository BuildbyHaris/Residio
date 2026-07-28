import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .required()
    .messages({
      "string.empty": "Full name is required",
      "any.required": "Full name is required",
      "string.min": "Full name must be at least 3 characters",
      "string.max": "Full name cannot exceed 20 characters",
      "string.pattern.base":
        "Full name can only contain letters and single spaces between words.",
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
    .trim()
    .required()
    .min(9)
    .max(15)
    .pattern(
      /^(\+92|92|0)?((3\d{2}[- ]?\d{7})|((2[1-9]|4[1-9]|5[1-9]|6[1-9]|7[1-9]|8[1-9]|9[1-9])[- ]?\d{7,8}))$/
    )
    .messages({
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
      "string.min": "Phone number is too short",
      "string.max": "Phone number is too long",
      "string.pattern.base":
        "Enter a valid mobile or Landline number.",
    }),
  password: Joi.string()
    .required()
    .min(8)
    .max(15)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+])[A-Za-z\d@#$%^&*()_+]{8,32}$/)
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must be at least 15 characters",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Please confirm your password",
    }),
});