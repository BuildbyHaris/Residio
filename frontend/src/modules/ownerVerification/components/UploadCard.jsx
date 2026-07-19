// modules/ownerVerification/components/UploadCard.jsx

import React, { useRef, useState, useCallback } from 'react';
import {
  HiOutlineCloudUpload,
  HiOutlinePhotograph,
  HiOutlineDocument,
  HiOutlineX,
  HiOutlineRefresh,
  HiCheck,
} from 'react-icons/hi';

const UploadCard = ({
  fileKey,
  label,
  description,
  icon: CustomIcon,
  file,
  preview,
  onUpload,
  onRemove,
  error,
}) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        simulateUpload(droppedFile);
      }
    },
    [fileKey, onUpload]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      simulateUpload(selectedFile);
    }
    // Reset input
    e.target.value = '';
  };

  const simulateUpload = (selectedFile) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUpload(fileKey, selectedFile);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(fileKey);
    setUploadProgress(0);
  };

  const handleReplace = (e) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  const isUploaded = !!file;
  const isPDF = preview === 'pdf';

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={!isUploaded ? handleClick : undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group
          ${
            error
              ? 'border-red-300 bg-red-50/50'
              : isUploaded
              ? 'border-green-300 bg-green-50/50 cursor-default'
              : isDragging
              ? 'border-orange-400 bg-orange-50 scale-[1.02]'
              : 'border-gray-200 bg-gray-50/50 hover:border-orange-300 hover:bg-orange-50/30'
          }
        `}
      >
        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-orange-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <div className="p-5 md:p-6">
          {isUploaded ? (
            // Uploaded State
            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                {isPDF ? (
                  <div className="w-full h-full flex items-center justify-center bg-red-50">
                    <HiOutlineDocument className="w-8 h-8 text-red-400" />
                  </div>
                ) : (
                  <img
                    src={preview}
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <HiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-semibold text-green-600">
                    Uploaded
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleReplace}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                  title="Replace"
                >
                  <HiOutlineRefresh className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={handleRemove}
                  className="w-9 h-9 rounded-lg bg-white border border-red-200 flex items-center justify-center hover:bg-red-50 transition-colors duration-200"
                  title="Remove"
                >
                  <HiOutlineX className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ) : isUploading ? (
            // Uploading State
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-3 animate-pulse">
                <HiOutlineCloudUpload className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Uploading...
              </p>
              <p className="text-xs text-gray-400 mt-1">{uploadProgress}%</p>
            </div>
          ) : (
            // Empty State
            <div className="text-center py-4 md:py-6">
              <div
                className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-200
                  ${isDragging ? 'bg-orange-100' : 'bg-gray-100 group-hover:bg-orange-50'}
                `}
              >
                {CustomIcon ? (
                  <CustomIcon
                    className={`w-7 h-7 transition-colors duration-200 ${
                      isDragging ? 'text-orange-500' : 'text-gray-400 group-hover:text-orange-400'
                    }`}
                  />
                ) : (
                  <HiOutlineCloudUpload
                    className={`w-7 h-7 transition-colors duration-200 ${
                      isDragging ? 'text-orange-500' : 'text-gray-400 group-hover:text-orange-400'
                    }`}
                  />
                )}
              </div>

              <p className="text-sm font-bold text-gray-800 mb-1">{label}</p>
              {description && (
                <p className="text-xs text-gray-400 mb-3">{description}</p>
              )}

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <span className="text-orange-500 font-semibold">
                  Click to upload
                </span>
                <span>or drag & drop</span>
              </div>

              <p className="text-xs text-gray-300 mt-2">
                JPG, PNG, WEBP, PDF • Max 5 MB
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-slideDown">
          {error}
        </p>
      )}
    </div>
  );
};

export default UploadCard;