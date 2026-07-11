import {
  registerApi,
  verifyOtpApi,
  verifyResetOtpApi,
  verifyResetSessionApi,
  resendOtpApi,
  loginApi,
  googleLoginApi,
  forgotPasswordApi,
  resetPasswordApi,
  getCurrentUserApi,
  logoutApi,
} from "../api/auth.api.js";

/**
 * Register User
 */
export const register = async (userData) => {
  const response = await registerApi(userData);

  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await verifyOtpApi(data);
  return response.data;
};

export const verifyResetOtp = async (data) => {
  const response = await verifyResetOtpApi(data);
  return response.data;
};

export const verifyResetSession = async () => {
  const response = await verifyResetSessionApi();
  return response.data;
};

export const resendOtp = async (data) => {
  const response = await resendOtpApi(data);
  return response.data;
};

/**
 * Login User
 */
export const login = async (credentials) => {
  const response = await loginApi(credentials);

  return response.data;
};

export const googleLogin = async (token) => {
  const response = await googleLoginApi(token);
  return response.data;
};

/**
 * Get Current User
 */
export const getCurrentUser = async () => {
  const response = await getCurrentUserApi();

  return response.data;
};

/**
 * Logout
 */
export const logout = async () => {
  const response = await logoutApi();

  return response.data;
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  const response = await forgotPasswordApi(email);

  return response.data;
};

/**
 * Reset Password
 */
export const resetPassword = async (data) => {
  const response = await resetPasswordApi(data);

  return response.data;
};