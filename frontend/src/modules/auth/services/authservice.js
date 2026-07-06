import {
  registerApi,
  loginApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../api/authApi";

/**
 * Register User
 */
export const register = async (userData) => {
  const response = await registerApi(userData);

  return response.data;
};

/**
 * Login User
 */
export const login = async (credentials) => {
  const response = await loginApi(credentials);

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
export const resetPassword = async (
  token,
  passwordData
) => {
  const response = await resetPasswordApi(
    token,
    passwordData
  );

  return response.data;
};