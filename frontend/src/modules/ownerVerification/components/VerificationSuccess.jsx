// modules/ownerVerification/components/VerificationSuccess.jsx

import React from 'react';
import { HiCheck, HiOutlineClock, HiOutlineMail } from 'react-icons/hi';

const VerificationSuccess = ({ onReturnToProfile }) => {
  return (
    <div className="w-full max-w-lg mx-auto text-center animate-fadeIn">
      {/* Success Icon */}
      <div className="relative mx-auto w-28 h-28 mb-8">
        <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
        <div className="absolute inset-0 rounded-full bg-green-50 animate-pulse" />
        <div className="relative w-28 h-28 rounded-full bg-green-100 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 animate-scaleIn">
            <HiCheck className="w-9 h-9 text-white" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3 animate-slideUp">
        Verification Submitted
        <br />
        <span className="text-green-600">Successfully!</span>
      </h1>

      {/* Description */}
      <p className="text-gray-500 leading-relaxed mb-8 max-w-md mx-auto animate-slideUp animation-delay-100">
        Your documents have been received. Our verification team will review
        your application within 24–48 hours.
      </p>

      {/* Status Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6 animate-slideUp animation-delay-200">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-lg font-bold text-gray-800">
            Pending Review
          </span>
        </div>

        <div className="space-y-4 text-left">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <HiOutlineClock className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Review Time
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Usually takes 24–48 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <HiOutlineMail className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Email Notification
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                You'll receive an email once verification is complete
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-8 text-left animate-slideUp animation-delay-300">
        <p className="text-sm font-bold text-orange-700 mb-2">
          🎉 What happens next?
        </p>
        <ul className="text-xs text-orange-600 space-y-1.5">
          <li>✓ Our team reviews your documents</li>
          <li>✓ You receive an approval email</li>
          <li>✓ Your account upgrades to Owner</li>
          <li>✓ Start listing properties immediately</li>
        </ul>
      </div>

      {/* CTA */}
      <button
        onClick={onReturnToProfile}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-orange-500/20 animate-slideUp animation-delay-400"
      >
        Return to Profile
      </button>
    </div>
  );
};

export default VerificationSuccess;