import axios from "axios";

const hostelPublicApi = axios.create({
  baseURL: "http://localhost:5000/api/v1/hostels",
});

export const getAllActiveHostelsApi = (params = {}) => {
  return hostelPublicApi.get("/", { params });
};