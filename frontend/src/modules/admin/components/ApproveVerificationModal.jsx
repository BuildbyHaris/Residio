import React, { useEffect, useRef } from 'react';
import { HiOutlineCheckCircle, HiX } from 'react-icons/hi';

const ApproveVerificationModal = ({ isOpen, onClose, onConfirm, loading, applicantName }) => {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.focus();
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
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <HiOutlineCheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-[#1e293b] text-center mb-2">
          Approve Owner Verification?
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
          You're about to approve {applicantName ? (
            <span className="font-medium text-[#1e293b]">{applicantName}'s</span>
          ) : 'this'} verification request. Once approved, this user will be upgraded to an Owner account and gain access to Owner features.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            ref={cancelRef}
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-green-500 rounded-xl hover:bg-green-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Approving...
              </span>
            ) : (
              'Approve Verification'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveVerificationModal;