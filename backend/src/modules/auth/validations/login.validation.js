import Joi from "joi";

export const loginValidationSchema = Joi.object({
  email: Joi.string()
    .trim()

    .lowercase()

    .email({ tlds: { allow: false } })

    .max(100)

    .required()

    .messages({

      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "string.max": "Email cannot exceed 100 characters",

    }),

  password: Joi.string()
    .min(8)
    .max(32)
    .required()
    .messages({

      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 32 characters",

    }),
      rememberMe: Joi.boolean().optional(),

}).options({

  abortEarly: false,
  allowUnknown: false,
});