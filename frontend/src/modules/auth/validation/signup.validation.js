import Joi from "joi";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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
  .custom((value, helpers) => {
    const phone = parsePhoneNumberFromString(value, "PK");

    if (!phone || !phone.isValid()) {
      return helpers.error("any.invalid");
    }

    return value;
  })
  .messages({
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
    "any.invalid": "Enter a valid Pakistani mobile or landline number.",
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