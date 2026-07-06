import {
  registerUser,
  forgotPassword,
} from "../services/auth.service.js";

/**
 * Register User
 */
export const register = async (req, res) => {
  console.log("✅ Register Controller Hit");
  console.log("Request Body:", req.body);

  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.log("❌ Register Error:", error);

    if (error.message === "Email already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

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

/**
 * Reset Password
 */

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