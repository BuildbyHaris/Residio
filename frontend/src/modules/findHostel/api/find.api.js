import api from "../../../services/api.js";

export const findApi = {
  search: (params) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );
    return api.get("/hostels", { params: filteredParams });
  },
  getById: (id) => {
    return api.get(`/hostels/${id}`);
  },
};
