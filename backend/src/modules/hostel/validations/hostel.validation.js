import { query, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { GENDER_TYPES, ROOM_TYPES, ALLOWED_SORT_KEYS, MAX_LIMIT } from "../constants/hostel.constants.js";

// Validation rules for search query
export const validateSearchQuery = [
  query("search")
    .optional()
    .trim()
    .isString().withMessage("Search must be a string")
    .isLength({ max: 100 }).withMessage("Search cannot exceed 100 characters")
    .escape(),

  query("gender")
    .optional()
    .isIn(GENDER_TYPES).withMessage(`Gender must be one of: ${GENDER_TYPES.join(", ")}`),

  query("roomType")
    .optional()
    .isIn(ROOM_TYPES).withMessage(`Room type must be one of: ${ROOM_TYPES.join(", ")}`),

  query("minPrice")
  .optional()
  .isInt({ min: 0 })
  .withMessage("minPrice must be a non-negative integer")
  .toInt(),

  query("maxPrice")
    .optional()
    .isInt({ min: 0 }).withMessage("maxPrice must be a non-negative integer")
    .toInt()
    .custom((value, { req }) => {
      if (req.query.minPrice && value < parseInt(req.query.minPrice)) {
        throw new Error("maxPrice must be greater than or equal to minPrice");
      }
      return true;
    }),

  query("availability")
    .optional()
    .isBoolean().withMessage("availability must be true or false")
    .toBoolean(),

  query("sort")
    .optional()
    .isIn(ALLOWED_SORT_KEYS).withMessage(`Sort must be one of: ${ALLOWED_SORT_KEYS.join(", ")}`),

  query("page")
    .optional()
    .isInt({ min: 1 }).withMessage("page must be a positive integer")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: MAX_LIMIT }).withMessage(`limit must be between 1 and ${MAX_LIMIT}`)
    .toInt(),
];

// Validation for hostel ID param
export const validateHostelId = [
  param("id")
    .notEmpty().withMessage("Hostel ID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid hostel ID format");
      }
      return true;
    }),
];

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};