import Joi from "joi";

export const ownerVerificationValidationSchema = Joi.object({
  // ==========================================
  // CNIC
  // ==========================================

  cnic: Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/)
    .messages({
      "string.empty": "CNIC is required",
      "any.required": "CNIC is required",
      "string.pattern.base":
        "CNIC must be in the format 12345-1234567-1",
    }),

  // ==========================================
  // Personal Information
  // ==========================================

  gender: Joi.string()
    .required()
    .valid("male", "female", "other")
    .messages({
      "string.empty": "Gender is required",
      "any.required": "Gender is required",
      "any.only": "Gender must be male, female or other",
    }),

  dateOfBirth: Joi.date()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
    .required()
    .messages({
      "date.base": "Please enter a valid date of birth",
      "date.max": "You must be at least 18 years old",
      "any.required": "Date of birth is required",
    }),

  // ==========================================
  // Address
  // ==========================================

  province: Joi.string().trim().required().messages({
    "string.empty": "Province is required",
    "any.required": "Province is required",
  }),

  city: Joi.string().trim().required().messages({
    "string.empty": "City is required",
    "any.required": "City is required",
  }),

  address: Joi.string()
    .trim()
    .min(10)
    .max(250)
    .required()
    .messages({
      "string.empty": "Address is required",
      "any.required": "Address is required",
      "string.min": "Address must be at least 10 characters",
      "string.max": "Address cannot exceed 250 characters",
    }),

  postalCode: Joi.string().trim().allow("").optional(),

  // ==========================================
  // Business Information
  // ==========================================

  businessName: Joi.string().trim().max(100).allow("").messages({
    "string.max": "Business name cannot exceed 100 characters",
  }),

  businessType: Joi.string()
    .valid("individual", "company")
    .default("individual")
    .messages({
      "any.only": "Business type must be individual or company",
    }),

  experience: Joi.number().integer().min(0).max(60).default(0).messages({
    "number.base": "Experience must be a number",
    "number.min": "Experience cannot be negative",
    "number.max": "Experience cannot exceed 60 years",
  }),

  // ==========================================
  // Declaration
  // ==========================================

  isAgreementAccepted: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      "any.only":
        "You must accept the declaration before submitting.",
      "any.required":
        "Agreement acceptance is required.",
    }),
});