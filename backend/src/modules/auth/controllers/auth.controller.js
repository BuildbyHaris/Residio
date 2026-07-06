import {
  registerUser,
  forgotPassword,
} from "../services/auth.service.js";

/**
 * Register User
 */
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    // Duplicate Email
    if (error.message === "Email already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    // Duplicate Phone
    if (error.message === "Phone number already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * Forgot Password
 */
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword(email);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Reset Password endpoint is under development.",
    });
  } catch (error) {
    next(error);
  }
};