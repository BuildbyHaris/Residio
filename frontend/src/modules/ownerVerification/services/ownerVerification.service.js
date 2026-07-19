// modules/ownerVerification/services/ownerVerification.service.js

import { ownerVerificationAPI } from '../api/ownerVerification.api';

export const ownerVerificationService = {
  submit: async (formData, files, onProgress) => {
    const multipartData = new FormData();

    // Append text fields
    multipartData.append('fullName', formData.fullName);
    multipartData.append('phone', formData.phone);
    multipartData.append('cnic', formData.cnic);
    multipartData.append('gender', formData.gender);
    multipartData.append('dateOfBirth', formData.dateOfBirth);
    multipartData.append('province', formData.province);
    multipartData.append('city', formData.city);
    multipartData.append('address', formData.address);
    multipartData.append('postalCode', formData.postalCode);
    multipartData.append('businessName', formData.businessName);
    multipartData.append('businessType', formData.businessType);
    multipartData.append('experience', formData.experience);
    multipartData.append('isAgreementAccepted', 'true');

    // Append files
    if (files.cnicFront) multipartData.append('cnicFront', files.cnicFront);
    if (files.cnicBack) multipartData.append('cnicBack', files.cnicBack);
    if (files.selfie) multipartData.append('selfie', files.selfie);
    if (files.ownershipProof)
      multipartData.append('ownershipProof', files.ownershipProof);

    // Add progress callback
    if (onProgress) {
      multipartData._onProgress = onProgress;
    }

    const response = await ownerVerificationAPI.submitVerification(multipartData);
    return response;
  },

  getStatus: async () => {
    const response = await ownerVerificationAPI.getVerificationStatus();
    return response;
  },
};

export default ownerVerificationService;