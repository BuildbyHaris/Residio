import Joi from "joi";

export const getMessagesValidationSchema = Joi.object({
  cursor: Joi.string()
    .trim()
    .allow("")
    .optional(),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(20),
});