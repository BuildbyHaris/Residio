import api from "../../../services/api.js";

export const hostelApi = {
  search: (params) => {
    // Remove empty values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
    );
    return api.get("/hostels", { params: cleanParams });
  },
  getById: (id) => {
    return api.get(`/hostels/${id}`);
  },
};