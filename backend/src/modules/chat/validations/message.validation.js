import Joi from "joi";

export const sendMessageValidationSchema = Joi.object({
  messageType: Joi.string()
    .valid("text", "image", "file")
    .default("text"),

  content: Joi.string()
    .trim()
    .max(5000)
    .when("messageType", {
      is: "text",
      then: Joi.string().min(1).required(),
      otherwise: Joi.string().allow("").optional(),
    }),

  clientMessageId: Joi.string()
    .trim()
    .max(100)
    .required(),
});