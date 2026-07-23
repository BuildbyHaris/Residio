// modules/ownerVerification/validation/ownerVerification.schema.js

export const VALID_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Gilgit-Baltistan',
  'Azad Jammu & Kashmir',
];

export const CITIES = {
  Punjab: [
    'Lahore',
    'Faisalabad',
    'Rawalpindi',
    'Multan',
    'Gujranwala',
    'Sialkot',
    'Bahawalpur',
    'Sargodha',
    'Sheikhupura',
    'Gujrat',
  ],
  Sindh: [
    'Karachi',
    'Hyderabad',
    'Sukkur',
    'Larkana',
    'Nawabshah',
    'Mirpur Khas',
    'Thatta',
  ],
  'Khyber Pakhtunkhwa': [
    'Peshawar',
    'Mardan',
    'Abbottabad',
    'Swat',
    'Mansehra',
    'Kohat',
    'Dera Ismail Khan',
  ],
  Balochistan: [
    'Quetta',
    'Gwadar',
    'Turbat',
    'Khuzdar',
    'Hub',
    'Chaman',
  ],
  'Islamabad Capital Territory': ['Islamabad'],
  'Gilgit-Baltistan': ['Gilgit', 'Skardu', 'Hunza'],
  'Azad Jammu & Kashmir': ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli'],
};

export const validateStepOne = (data) => {
  const errors = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters';
  }

  if (!data.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?\d{10,11}$/.test(data.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Enter a valid phone number';
  }

  if (!data.cnic) {
    errors.cnic = 'CNIC number is required';
  } else if (!/^\d{5}-?\d{7}-?\d{1}$/.test(data.cnic.replace(/-/g, ''))) {
    errors.cnic = 'Enter a valid 13-digit CNIC number';
  }

  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      errors.dateOfBirth = 'You must be at least 18 years old';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStepTwo = (data) => {
  const errors = {};

  if (!data.province) {
    errors.province = 'Province is required';
  }

  if (!data.city) {
    errors.city = 'City is required';
  }

  if (!data.address || data.address.trim().length < 10) {
    errors.address = 'Address must be at least 10 characters';
  }

  if (!data.postalCode) {
    errors.postalCode = 'Postal code is required';
  } else if (!/^\d{5}$/.test(data.postalCode)) {
    errors.postalCode = 'Enter a valid 5-digit postal code';
  }

  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.businessName = 'Business name is required';
  }

  if (!data.businessType) {
    errors.businessType = 'Select a business type';
  }

  if (!data.experience) {
    errors.experience = 'Experience is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStepThree = (files) => {
  const errors = {};

  const requiredFiles = ['cnicFront', 'cnicBack', 'selfie', 'ownershipProof'];

  requiredFiles.forEach((fileKey) => {
    if (!files[fileKey]) {
      const labels = {
        cnicFront: 'CNIC Front',
        cnicBack: 'CNIC Back',
        selfie: 'Selfie with CNIC',
        ownershipProof: 'Ownership Proof',
      };
      errors[fileKey] = `${labels[fileKey]} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateFile = (file) => {
  if (!file) return { isValid: false, error: 'No file selected' };

  if (!VALID_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Unsupported file type. Use JPG, PNG, WEBP, or PDF',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size exceeds 5 MB limit',
    };
  }

  return { isValid: true, error: null };
};

export const validateStepFour = (isAgreementAccepted) => {
  if (!isAgreementAccepted) {
    return {
      isValid: false,
      errors: { agreement: 'You must accept the terms to continue' },
    };
  }
  return { isValid: true, errors: {} };
};