import { registerUser } from "../api/authApi";

export const signup = async (userData) => {
  try {
    const response = await registerUser(userData);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      errors: error.response?.data?.errors || [],
    };
  }
};