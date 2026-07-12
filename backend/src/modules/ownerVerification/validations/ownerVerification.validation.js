import Joi from "joi";

export const ownerVerificationValidationSchema = Joi.object({
  // CNIC
  cnic: Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9]{13}$/)
    .messages({
      "string.empty": "CNIC is required",
      "any.required": "CNIC is required",
      "string.pattern.base": "CNIC must contain exactly 13 digits",
    }),

  // Date of Birth
  dateOfBirth: Joi.date()
    .required()
    .messages({
      "date.base": "Please enter a valid date of birth",
      "any.required": "Date of birth is required",
    }),

  // Hostel Name
  hostelName: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(100)
    .messages({
      "string.empty": "Hostel name is required",
      "any.required": "Hostel name is required",
      "string.min": "Hostel name must be at least 3 characters",
      "string.max": "Hostel name cannot exceed 100 characters",
    }),

  // Hostel Type
  hostelType: Joi.string()
    .valid("boys", "girls", "both")
    .required()
    .messages({
      "any.only": "Hostel type must be boys, girls or both",
      "any.required": "Hostel type is required",
    }),

  // Hostel Address
  hostelAddress: Joi.string()
    .trim()
    .required()
    .min(10)
    .messages({
      "string.empty": "Hostel address is required",
      "any.required": "Hostel address is required",
      "string.min": "Hostel address must be at least 10 characters",
    }),

  // City
  city: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "City is required",
      "any.required": "City is required",
    }),

  // Province
  province: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Province is required",
      "any.required": "Province is required",
    }),

  // Postal Code
  postalCode: Joi.string()
    .trim()
    .allow("")
    .optional(),

  // Total Rooms
  totalRooms: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Total rooms must be a number",
      "number.min": "Total rooms must be at least 1",
      "any.required": "Total rooms are required",
    }),

  // Total Beds
  totalBeds: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Total beds must be a number",
      "number.min": "Total beds must be at least 1",
      "any.required": "Total beds are required",
    }),

  // Starting Rent
  startingRent: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base": "Starting rent must be a number",
      "number.min": "Starting rent must be greater than 0",
      "any.required": "Starting rent is required",
    }),

  // Description
  description: Joi.string()
    .trim()
    .allow("")
    .max(500)
    .messages({
      "string.max": "Description cannot exceed 500 characters",
    }),
});