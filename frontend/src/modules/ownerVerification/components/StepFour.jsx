// modules/ownerVerification/components/StepFour.jsx

import React from 'react';
import {
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineDocument,
  HiOutlineShieldCheck,
  HiCheck,
} from 'react-icons/hi';

const ReviewSection = ({ icon: Icon, title, children }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-5 mb-4 hover:shadow-sm transition-shadow duration-200">
    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
      <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-orange-500" />
      </div>
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const ReviewField = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-2">
    <span className="text-sm text-gray-400 font-medium sm:w-40 flex-shrink-0">
      {label}
    </span>
    <span className="text-sm font-semibold text-gray-800 mt-0.5 sm:mt-0">
      {value || '—'}
    </span>
  </div>
);

const FileReviewItem = ({ label, file }) => (
  <div className="flex items-center gap-3 py-2">
    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
      <HiCheck className="w-4 h-4 text-green-500" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate">
        {file?.name || 'Not uploaded'}
      </p>
    </div>
    {file && (
      <span className="text-xs text-gray-400 flex-shrink-0">
        {(file.size / 1024 / 1024).toFixed(2)} MB
      </span>
    )}
  </div>
);

const StepFour = ({ formData, files, updateField, errors, isSubmitting, onSubmit, uploadProgress }) => {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
          <HiOutlineShieldCheck className="w-7 h-7 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Review & Submit
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Please review your information before submitting
        </p>
      </div>

      {/* Personal Information */}
      <ReviewSection icon={HiOutlineUser} title="Personal Information">
        <div className="divide-y divide-gray-50">
          <ReviewField label="Full Name" value={formData.fullName} />
          <ReviewField label="Phone" value={formData.phone} />
          <ReviewField label="CNIC" value={formData.cnic} />
          <ReviewField
            label="Gender"
            value={formData.gender?.charAt(0).toUpperCase() + formData.gender?.slice(1)}
          />
          <ReviewField
            label="Date of Birth"
            value={
              formData.dateOfBirth
                ? new Date(formData.dateOfBirth).toLocaleDateString('en-PK', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : ''
            }
          />
        </div>
      </ReviewSection>

      {/* Address */}
      <ReviewSection icon={HiOutlineLocationMarker} title="Address">
        <div className="divide-y divide-gray-50">
          <ReviewField label="Province" value={formData.province} />
          <ReviewField label="City" value={formData.city} />
          <ReviewField label="Address" value={formData.address} />
          <ReviewField label="Postal Code" value={formData.postalCode} />
        </div>
      </ReviewSection>

      {/* Business */}
      <ReviewSection icon={HiOutlineBriefcase} title="Business">
        <div className="divide-y divide-gray-50">
          <ReviewField label="Business Name" value={formData.businessName} />
          <ReviewField
            label="Business Type"
            value={
              formData.businessType?.charAt(0).toUpperCase() +
              formData.businessType?.slice(1)
            }
          />
          <ReviewField label="Experience" value={formData.experience} />
        </div>
      </ReviewSection>

      {/* Documents */}
      <ReviewSection icon={HiOutlineDocument} title="Documents">
        <div className="divide-y divide-gray-50">
          <FileReviewItem label="CNIC Front" file={files.cnicFront} />
          <FileReviewItem label="CNIC Back" file={files.cnicBack} />
          <FileReviewItem label="Selfie with CNIC" file={files.selfie} />
          <FileReviewItem label="Ownership Proof" file={files.ownershipProof} />
        </div>
      </ReviewSection>

      {/* Agreement */}
      <div className="mt-6 bg-orange-50/50 border border-orange-100 rounded-xl p-5">
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={formData.isAgreementAccepted}
              onChange={(e) => updateField('isAgreementAccepted', e.target.checked)}
              className="sr-only"
            />
            <div
              className={`
                w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200
                ${
                  formData.isAgreementAccepted
                    ? 'bg-orange-500 border-orange-500'
                    : 'border-gray-300 bg-white group-hover:border-orange-300'
                }
              `}
            >
              {formData.isAgreementAccepted && (
                <svg
                  className="w-3.5 h-3.5 text-white animate-scaleIn"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-gray-600 leading-relaxed">
            I confirm that all information provided is accurate and I agree to
            Residio's{' '}
            <a href="#" className="text-orange-500 font-semibold hover:underline">
              verification terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-orange-500 font-semibold hover:underline">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.agreement && (
          <p className="text-red-500 text-xs mt-2 ml-10 font-medium animate-slideDown">
            {errors.agreement}
          </p>
        )}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-sm text-red-600 font-medium">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-8">
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`
            w-full py-4 px-8 rounded-xl font-semibold text-base transition-all duration-200 
            flex items-center justify-center gap-3
            ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transform hover:scale-[1.01] active:scale-[0.99]'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Submitting Verification...</span>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <span className="text-sm opacity-75">({uploadProgress}%)</span>
              )}
            </>
          ) : (
            <>
              <HiOutlineShieldCheck className="w-5 h-5" />
              <span>Submit Verification</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepFour;