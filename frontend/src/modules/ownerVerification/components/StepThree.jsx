// modules/ownerVerification/components/StepThree.jsx

import React from 'react';
import {
  HiOutlineIdentification,
  HiOutlineCamera,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import UploadCard from './UploadCard';

const StepThree = ({ files, filePreviews, handleFileUpload, removeFile, errors }) => {
  const uploadCards = [
    {
      fileKey: 'cnicFront',
      label: 'CNIC Front',
      description: 'Upload a clear photo of the front side of your CNIC',
      icon: HiOutlineIdentification,
    },
    {
      fileKey: 'cnicBack',
      label: 'CNIC Back',
      description: 'Upload a clear photo of the back side of your CNIC',
      icon: HiOutlineIdentification,
    },
    {
      fileKey: 'selfie',
      label: 'Selfie holding CNIC',
      description: 'Take a selfie while holding your CNIC next to your face',
      icon: HiOutlineCamera,
    },
    {
      fileKey: 'ownershipProof',
      label: 'Ownership Proof',
      description: 'Property deed, utility bill, or rental agreement',
      icon: HiOutlineDocumentText,
    },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
          <HiOutlineShieldCheck className="w-7 h-7 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Upload Documents</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Upload clear, readable photos of your documents
        </p>
      </div>

      {/* Tips Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <p className="text-xs font-semibold text-blue-700 mb-2">📸 Tips for a great upload</p>
        <ul className="text-xs text-blue-600 space-y-1">
          <li>• Ensure all text is clearly visible and readable</li>
          <li>• Avoid glare and shadows on documents</li>
          <li>• For selfie, hold CNIC next to your face clearly</li>
        </ul>
      </div>

      <div className="space-y-4">
        {uploadCards.map((card, index) => (
          <div
            key={card.fileKey}
            className="animate-slideUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <UploadCard
              fileKey={card.fileKey}
              label={card.label}
              description={card.description}
              icon={card.icon}
              file={files[card.fileKey]}
              preview={filePreviews[card.fileKey]}
              onUpload={handleFileUpload}
              onRemove={removeFile}
              error={errors[card.fileKey]}
            />
          </div>
        ))}
      </div>

      {/* Upload status summary */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium">Upload Progress</span>
          <span className="text-gray-800 font-bold">
            {Object.values(files).filter(Boolean).length} / 4 files
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(Object.values(files).filter(Boolean).length / 4) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepThree;