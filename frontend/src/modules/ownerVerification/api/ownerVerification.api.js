import api from "../../../services/api";

export const ownerVerificationAPI = {
  submitVerification(formData) {
    return api.post(
      "/owner-verification/submit",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  getVerificationStatus() {
    return api.get("/owner-verification/status");
  },
};

export default ownerVerificationAPI;