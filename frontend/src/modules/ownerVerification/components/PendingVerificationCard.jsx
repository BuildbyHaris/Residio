// modules/ownerVerification/components/PendingVerificationCard.jsx
// Use this component in your Profile page to replace the "Switch to Seller" button

import React from 'react';
import { HiOutlineClock, HiOutlineShieldCheck } from 'react-icons/hi';

const PendingVerificationCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
          <HiOutlineShieldCheck className="w-6 h-6 text-yellow-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-800">Owner Verification</h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-600 border border-yellow-200">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              Pending Review
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mt-2">
            Your verification request has been submitted successfully.
            Our team is currently reviewing your documents. You'll receive an
            email once your verification is complete.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-5 pt-5 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-700">Submitted</p>
            <p className="text-xs text-gray-400">Documents received</p>
          </div>
          <div className="h-px w-8 bg-gray-200" />
          <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
            <HiOutlineClock className="w-4 h-4 text-yellow-500 animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-700">Under Review</p>
            <p className="text-xs text-gray-400">24–48 hours</p>
          </div>
          <div className="h-px w-8 bg-gray-200" />
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <HiOutlineShieldCheck className="w-4 h-4 text-gray-300" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-400">Approved</p>
            <p className="text-xs text-gray-300">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingVerificationCard;