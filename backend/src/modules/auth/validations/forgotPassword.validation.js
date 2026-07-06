import Joi from "joi";

export const forgotPasswordValidationSchema  = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
}).options({
    abortEarly: false,
    allowUnknown: false,
});
