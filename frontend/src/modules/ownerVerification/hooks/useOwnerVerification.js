// modules/ownerVerification/hooks/useOwnerVerification.js

import { useState, useCallback, useReducer } from 'react';
import { ownerVerificationService } from '../services/ownerVerification.service';
import {
  validateStepOne,
  validateStepTwo,
  validateStepThree,
  validateStepFour,
  validateFile,
} from '../validation/ownerVerification.schema';

const initialFormData = {
  fullName: '',
  phone: '',
  cnic: '',
  gender: '',
  dateOfBirth: '',
  province: '',
  city: '',
  address: '',
  postalCode: '',
  businessName: '',
  businessType: '',
  experience: '',
  isAgreementAccepted: false,
};

const initialFiles = {
  cnicFront: null,
  cnicBack: null,
  selfie: null,
  ownershipProof: null,
};

const initialFilePreviews = {
  cnicFront: null,
  cnicBack: null,
  selfie: null,
  ownershipProof: null,
};

// Reducer for form state management
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialFormData;
    default:
      return state;
  }
};

export const useOwnerVerification = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome
  const [formData, dispatch] = useReducer(formReducer, initialFormData);
  const [files, setFiles] = useState(initialFiles);
  const [filePreviews, setFilePreviews] = useState(initialFilePreviews);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const updateField = useCallback((field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
    // Clear error for this field
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const handleFileUpload = useCallback((fileKey, file) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      setErrors((prev) => ({ ...prev, [fileKey]: validation.error }));
      return false;
    }

    setFiles((prev) => ({ ...prev, [fileKey]: file }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fileKey];
      return newErrors;
    });

    // Generate preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviews((prev) => ({ ...prev, [fileKey]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreviews((prev) => ({ ...prev, [fileKey]: 'pdf' }));
    }

    return true;
  }, []);

  const removeFile = useCallback((fileKey) => {
    setFiles((prev) => ({ ...prev, [fileKey]: null }));
    setFilePreviews((prev) => ({ ...prev, [fileKey]: null }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    let validation;

    switch (currentStep) {
      case 1:
        validation = validateStepOne(formData);
        break;
      case 2:
        validation = validateStepTwo(formData);
        break;
      case 3:
        validation = validateStepThree(files);
        break;
      case 4:
        validation = validateStepFour(formData.isAgreementAccepted);
        break;
      default:
        return true;
    }

    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    setErrors({});
    return true;
  }, [currentStep, formData, files]);

  const goToNextStep = useCallback(() => {
    if (validateCurrentStep()) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      return true;
    }
    return false;
  }, [currentStep, validateCurrentStep]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const startVerification = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const submitVerification = useCallback(async () => {
    if (!validateCurrentStep()) return false;

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      await ownerVerificationService.submit(
        formData,
        files,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      setIsSuccess(true);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Something went wrong. Please try again.';
      setErrors({ submit: message });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, files, validateCurrentStep]);

  return {
    // State
    currentStep,
    formData,
    files,
    filePreviews,
    errors,
    isSubmitting,
    isSuccess,
    uploadProgress,
    completedSteps,

    // Actions
    updateField,
    handleFileUpload,
    removeFile,
    goToNextStep,
    goToPreviousStep,
    startVerification,
    submitVerification,
    setCurrentStep,
  };
};

export default useOwnerVerification;