import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/profile.service";

export function useProfile() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

  // Fetch Profile
  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);

      const profile =
        await profileService.getProfile();

      setUser(profile);

      setError("");
    } catch (err) {
  console.log("Profile Error:", err);
  console.log("Response:", err.response);
  console.log("Data:", err.response?.data);

  setError(
    err.response?.data?.message ||
    err.message ||
    "Failed to load profile."
  );
} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const openEditModal = () => setIsEditModalOpen(true);

  const closeEditModal = () => setIsEditModalOpen(false);

  const openSwitchModal = () => setIsSwitchModalOpen(true);

  const closeSwitchModal = () => setIsSwitchModalOpen(false);

  const saveProfile = async (formData) => {
    try {
      const updatedProfile =
        await profileService.saveProfile(formData);

      setUser(updatedProfile);

      return updatedProfile;
    } catch (err) {
      throw err;
    }
  };

  return {
    user,
    loading,
    error,

    isEditModalOpen,
    isSwitchModalOpen,

    openEditModal,
    closeEditModal,

    openSwitchModal,
    closeSwitchModal,

    saveProfile,

    reloadProfile: loadProfile,
  };
}