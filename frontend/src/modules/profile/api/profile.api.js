import api from "../../../services/api";

export const fetchProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};

export const updateProfile = async (formData) => {
  const { data } = await api.patch(
    "/profile",
    formData,
    { 
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};