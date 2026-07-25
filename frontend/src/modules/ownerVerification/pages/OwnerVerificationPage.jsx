// modules/ownerVerification/pages/OwnerVerificationPage.jsx

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineX, HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { useOwnerVerification } from '../hooks/useOwnerVerification';
import WelcomeScreen from '../components/WelcomeScreen';
import VerificationStepper from '../components/VerificationStepper';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import StepFour from '../components/StepFour';
import VerificationSuccess from '../components/VerificationSuccess';

const OwnerVerificationPage = () => {
  const navigate = useNavigate();

  const {
    currentStep,
    formData,
    files,
    filePreviews,
    errors,
    isSubmitting,
    isSuccess,
    uploadProgress,
    completedSteps,
    updateField,
    handleFileUpload,
    removeFile,
    goToNextStep,
    goToPreviousStep,
    startVerification,
    submitVerification,
  } = useOwnerVerification();

  const handleSaveAndExit = useCallback(() => {
    // Could save draft to localStorage here
    navigate('/profile');
  }, [navigate]);

  const handleReturnToProfile = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeScreen
            onStart={startVerification}
            onBack={() => navigate('/profile')}
          />
        );
      case 1:
        return (
          <StepOne
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
        );
      case 2:
        return (
          <StepTwo
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
        );
      case 3:
        return (
          <StepThree
            files={files}
            filePreviews={filePreviews}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            errors={errors}
          />
        );
      case 4:
        return (
          <StepFour
            formData={formData}
            files={files}
            updateField={updateField}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={submitVerification}
            uploadProgress={uploadProgress}
          />
        );
      default:
        return null;
    }
  };

  // Success Screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/20">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Resid<span className="text-orange-500">io</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
          <VerificationSuccess onReturnToProfile={handleReturnToProfile} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Resid<span className="text-orange-500">io</span>
              </span>
            </div>

            {/* Save & Exit */}
            {currentStep > 0 && (
              <button
                onClick={handleSaveAndExit}
                disabled={isSubmitting}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <span className="hidden sm:inline">Save & Exit</span>
                <HiOutlineX className="w-5 h-5 sm:hidden" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Stepper */}
          {currentStep >= 1 && currentStep <= 4 && (
            <VerificationStepper
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
          )}

          {/* Step Content Card */}
          {currentStep >= 1 && currentStep <= 4 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10">
              {/* Step Content */}
              <div className="transition-all duration-300">{renderCurrentStep()}</div>

              {/* Navigation Buttons (Steps 1-3 only, Step 4 has its own submit) */}
              {currentStep >= 1 && currentStep <= 3 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={goToPreviousStep}
                    disabled={currentStep === 1}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                      ${
                        currentStep === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }
                    `}
                  >
                    <HiArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={goToNextStep}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20"
                  >
                    <span>Continue</span>
                    <HiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Back button for Step 4 */}
              {currentStep === 4 && (
                <div className="mt-4">
                  <button
                    onClick={goToPreviousStep}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200 text-sm mx-auto"
                  >
                    <HiArrowLeft className="w-4 h-4" />
                    <span>Go Back</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Welcome Screen (no card wrapper)
            renderCurrentStep()
          )}

          {/* Step info */}
          {currentStep >= 1 && currentStep <= 4 && (
            <p className="text-center text-xs text-gray-400 mt-6">
              Step {currentStep} of 4 • Your information is encrypted and secure 🔒
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default OwnerVerificationPage;