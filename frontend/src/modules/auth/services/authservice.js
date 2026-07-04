import api from '../api/authApi';

export const registerUser = async (formData) => {
  const response = await api.post('/auth/register', formData);
  return response.data;
};