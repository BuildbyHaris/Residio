import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineXCircle, HiX } from 'react-icons/hi';
import { validateRejectionReason } from '../validation/admin.validation';

const RejectVerificationModal = ({ isOpen, onClose, onConfirm, loading, applicantName }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setReason('');
      setError(null);
      setTimeout(() => textareaRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, loading, onClose]);

  const handleSubmit = () => {
    const validationError = validateRejectionReason(reason);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onConfirm(reason.trim());
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (error) {
      const validationError = validateRejectionReason(e.target.value);
      setError(validationError);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          aria-label="Close modal"
        >
          <HiX className="w-4 h-4 text-gray-400" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <HiOutlineXCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-[#1e293b] text-center mb-2">
          Reject Owner Verification
        </h3>
        <p className="text-sm text-gray-500 text-center mb-5 leading-relaxed">
          {applicantName ? (
            <>Please provide a reason for rejecting <span className="font-medium text-[#1e293b]">{applicantName}'s</span> request.</>
          ) : (
            <>Please provide a clear reason for rejecting this request.</>
          )}
          {' '}This helps the applicant understand what needs to be improved.
        </p>

        {/* Textarea */}
        <div className="mb-5">
          <textarea
            ref={textareaRef}
            value={reason}
            onChange={handleReasonChange}
            placeholder="Enter rejection reason..."
            disabled={loading}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border text-sm resize-none transition-all duration-200 outline-none
              ${error
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 bg-gray-50 focus:border-[#ec6a52] focus:ring-2 focus:ring-orange-100 focus:bg-white'
              }
              ${loading ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            aria-label="Rejection reason"
            aria-invalid={!!error}
          />
          <div className="flex items-center justify-between mt-1.5">
            {error ? (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            ) : (
              <span />
            )}
            <p className="text-xs text-gray-400">{reason.length}/500</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Rejecting...
              </span>
            ) : (
              'Reject Verification'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectVerificationModal;