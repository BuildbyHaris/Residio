import axios from "axios";

// Shared Auth API instance
const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Register User
 */
export const registerApi = (userData) => {
  return authApi.post("/register", userData);
};

/**
 * Login User
 */
export const loginApi = (credentials) => {
  return authApi.post("/login", credentials);
};

/**
 * Forgot Password
 */
export const forgotPasswordApi = (email) => {
  return authApi.post("/forgot-password", {
    email,
  });
};

/**
 * Reset Password
 */
export const resetPasswordApi = (token, passwordData) => {
  return authApi.post(
    `/reset-password/${token}`,
    passwordData
  );
};

export default authApi;