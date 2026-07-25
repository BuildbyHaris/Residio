import {
  fetchProfile,
  updateProfile,
} from "../api/profile.api";

export const profileService = {
  async getProfile() {
    const response = await fetchProfile();

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async saveProfile(formData) {
    const response = await updateProfile(formData);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },
};