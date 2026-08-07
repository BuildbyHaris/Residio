import Joi from "joi";

export const createPropertyConversationValidationSchema =
  Joi.object({
    hostelId: Joi.string()
      .hex()
      .length(24)
      .required()
      .messages({
        "string.base": "Hostel ID must be a string",
        "string.hex": "Hostel ID must be a valid MongoDB ID",
        "string.length":
          "Hostel ID must be a valid MongoDB ID",
        "any.required": "Hostel ID is required",
      }),
  });