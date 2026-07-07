export const validate = (schema) => {
  return (req, res, next) => {
    console.log("Incoming Body:", req.body);

    const { value, error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    console.log("Joi Error:", error);
    console.log("Joi Details:", error?.details);

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

    req.body = value;
    console.log("✅ Validation Passed");
    next();
  };
};