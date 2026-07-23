import axios from "axios";

const hostelApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/hostels/",
  withCredentials: true,
});

export const createHostelApi = (formData) => {
  return hostelApi.post("", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getMyHostelsApi = () => {
  return hostelApi.get("/my-hostels");
};

export const updateHostelApi = (id, formData) => {
  return hostelApi.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteHostelApi = (id) => {
  return hostelApi.delete(`/${id}`);
};

export default hostelApi;
