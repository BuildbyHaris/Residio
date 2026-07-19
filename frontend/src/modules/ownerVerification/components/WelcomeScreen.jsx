// modules/ownerVerification/components/WelcomeScreen.jsx

import React from 'react';
import {
  HiOutlineHome,
  HiOutlineClipboardCheck,
  HiOutlineBadgeCheck,
  HiOutlineViewGrid,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineArrowLeft,
} from 'react-icons/hi';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

const WelcomeScreen = ({ onStart, onBack }) => {
  const benefits = [
    { icon: HiOutlineBuildingOffice2, text: 'List unlimited properties' },
    { icon: HiOutlineCalendar, text: 'Receive bookings' },
    { icon: HiOutlineClipboardCheck, text: 'Manage your listings' },
    { icon: HiOutlineBadgeCheck, text: 'Build trust with a Verified Owner badge' },
    { icon: HiOutlineViewGrid, text: 'Access Owner Dashboard' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn">
      {/* Illustration Area */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-orange-50 flex items-center justify-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-orange-100 flex items-center justify-center">
              <HiOutlineShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-orange-500" />
            </div>
          </div>
          {/* Decorative dots */}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-200 animate-pulse" />
          <div className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-orange-300 animate-pulse delay-300" />
          <div className="absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-orange-400 animate-pulse delay-700" />
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Become a Verified
          <br />
          <span className="text-orange-500">Property Owner</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Verify your identity once and start listing hostels, apartments and
          rental properties on Residio.
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">
          What you'll get
        </h3>
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-4 group animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors duration-200">
                <benefit.icon className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-gray-700 font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-8 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
          <HiOutlineClock className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Quick Verification
          </p>
          <p className="text-sm text-gray-500 mt-0.5">
            Verification usually takes 24–48 hours after submission.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <button
          onClick={onStart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-orange-500/20 text-base"
        >
          Start Verification
        </button>
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 font-medium py-3 px-8 rounded-xl transition-colors duration-200 text-sm"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;