import axios from "axios";

// Shared Auth API instance

const authApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/auth",
  withCredentials: true,
});


/**
 * Register User
 */
export const registerApi = (userData) => {
  return authApi.post("/register", userData);
};

export const verifyOtpApi = (data) => {
  return authApi.post("/verify-otp", data);
};

export const verifyResetOtpApi = (data) => {
  return authApi.post("/verify-reset-otp", data);
};

export const verifyResetSessionApi = () => {
  return authApi.get("/verify-reset-session");
};

export const resendOtpApi = (data) => {
  return authApi.post("/resend-otp", data);
};

/**
 * Login User
 */
export const loginApi = (credentials) => {
  return authApi.post("/login", credentials);
};

export const googleLoginApi = (token) => {
  return authApi.post("/google-login", { token });
};

export const getCurrentUserApi = () => {
  return authApi.get("/me");
};

export const logoutApi = () => {
  return authApi.post("/logout");
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
export const resetPasswordApi = (data) => {
  return authApi.post("/reset-password", data);
};

export default authApi;