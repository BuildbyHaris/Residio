import Joi from "joi";

export const profileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be less than 50 characters",
      "any.required": "Name is required",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[+]?[\d\s\-()]{10,20}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base":
        "Please enter a valid phone number",
      "any.required": "Phone number is required",
    }),

  bio: Joi.string()
    .trim()
    .max(300)
    .allow("")
    .optional()
    .messages({
      "string.max":
        "Bio cannot exceed 300 characters",
    }),

  gender: Joi.string()
    .valid("male", "female", "other", "")
    .allow("")
    .optional(),

  dateOfBirth: Joi.date()
    .allow(null, "")
    .optional(),
}).options({
  abortEarly: false,
  allowUnknown: false,
});

/*
---------------------------------------
Validate whole profile
---------------------------------------
*/

export function validateProfile(data) {
  const { error } = profileSchema.validate(data);

  if (!error) {
    return {
      isValid: true,
      errors: {},
    };
  }

  const errors = {};

  error.details.forEach((item) => {
    errors[item.path[0]] = item.message;
  });

  return {
    isValid: false,
    errors,
  };
}

/*
---------------------------------------
Validate single field
---------------------------------------
*/

export function validateField(name, value) {
  const fieldSchema = profileSchema.extract(name);

  const { error } = fieldSchema.validate(value);

  return error ? error.details[0].message : null;
}