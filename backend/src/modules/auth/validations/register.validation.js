import Joi from "joi";

export const registerValidationSchema = Joi.object({
  // Name
  name: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
    .messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
      "string.min": "Name must be between 3 and 50 characters",
      "string.max": "Name must be between 3 and 50 characters",
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
    .pattern(/^\+92\d{10}$/)
    .messages({
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
      "string.pattern.base": "Phone number must be in the format +923234113114",
    }),

  // Password
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/[a-z]/, 'lowercase')
    .pattern(/[A-Z]/, 'uppercase')
    .pattern(/[0-9]/, 'number')
    .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special character')
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.name": "Password must contain at least one {#name}",
    }),

  // Confirm Password
  confirmpassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm Password is required",
      "any.required": "Confirm Password is required",
      "any.only": "Passwords do not match",
    }),

  // Role
  role: Joi.string()
    .required()
    .valid("student", "owner")
    .messages({
      "string.empty": "Role is required",
      "any.required": "Role is required",
      "any.only": "Role must be student or owner",
    }),
});

// Validation Error Handler Middleware
export const validate = (req, res, next) => {
  // abortEarly: false ensures all validation errors are captured, not just the first one
  const { error } = registerValidationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  next();
};