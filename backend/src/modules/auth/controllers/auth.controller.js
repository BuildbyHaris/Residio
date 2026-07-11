import {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  googleLoginUser,
  forgotPassword,
  resetPassword,
  verifyResetOTP,
  verifyResetSession,
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
      stack: error.stack,

    });
  }
};

export const verifyOTPController = async (
  req,
  res,
  next
) => {
  try {
    const result = await verifyOTP(req.body);

    if (result.token) {
      res.cookie("accessToken", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const resendOTPController =
  async (req, res, next) => {

    try {

      const { email } = req.body;

      const result =
        await resendOTP(email);

      return res.status(200).json(result);

    }

    catch (error) {

      next(error);

    }

  };


/**
 * Login Controller
 */
export const loginController = async (
  req,
  res,
  next
) => {
  try {

    const result = await loginUser(req.body);

    const { token, user, message } = result;

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message,
      user,
    });

  } catch (error) {
    next(error);
  }
};

export const googleLoginController = async (req, res, next) => {
  try {
    const { token: idToken } = req.body;
    const result = await googleLoginUser(idToken);

    if (result.token) {
      res.cookie("accessToken", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserController = (
  req,
  res
) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logoutController = (
  req,
  res
) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
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

export const resetPasswordController = async (
  req,
  res,
  next
) => {
  try {
    const resetToken = req.cookies.resetSessionToken;
    if (!resetToken) {
      return res.status(401).json({
        success: false,
        message: "Please verify your password reset OTP first.",
      });
    }

    const result = await resetPassword(
      resetToken,
      req.body.password
    );

    // Clear resetSessionToken
    res.clearCookie("resetSessionToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid or expired reset session.") {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired reset session.",
      });
    }
    next(error);
  }
};

export const verifyResetOTPController = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyResetOTP({ email, otp });

    if (result.resetSessionToken) {
      res.cookie("resetSessionToken", result.resetSessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 mins
      });
    }

    // Don't leak the token in the response body
    delete result.resetSessionToken;

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyResetSessionController = async (req, res) => {
  try {
    console.log("Cookies:", req.cookies);

    const resetToken = req.cookies.resetSessionToken;

    if (!resetToken) {
      return res.status(401).json({
        success: false,
        message: "No active password reset session found.",
      });
    }

    const result = await verifyResetSession(resetToken);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired reset session.",
    });
  }
};