// modules/ownerVerification/components/StepOne.jsx

import React, { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineIdentification,
  HiOutlineCalendar,
} from 'react-icons/hi';

const FloatingInput = ({
  label,
  name,
  value,
  onChange,
  error,
  icon: Icon,
  type = 'text',
  placeholder,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value;

  return (
    <div className="relative">
      <div
        className={`
        relative border-2 rounded-xl transition-all duration-200
        ${
          error
            ? 'border-red-300 bg-red-50/30'
            : isFocused
            ? 'border-orange-400 bg-white shadow-sm shadow-orange-500/10'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      >
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon
              className={`w-5 h-5 transition-colors duration-200 ${
                error
                  ? 'text-red-400'
                  : isFocused
                  ? 'text-orange-500'
                  : 'text-gray-400'
              }`}
            />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ' '}
          maxLength={maxLength}
          className={`
            w-full bg-transparent outline-none text-gray-800 font-medium
            ${Icon ? 'pl-12 pr-4' : 'pl-4 pr-4'}
            ${isActive ? 'pt-6 pb-2' : 'py-4'}
            text-sm md:text-base
          `}
        />
        <label
          className={`
            absolute left-${Icon ? '12' : '4'} transition-all duration-200 pointer-events-none
            ${
              isActive
                ? 'top-2 text-xs font-semibold'
                : 'top-1/2 -translate-y-1/2 text-sm'
            }
            ${
              error
                ? 'text-red-400'
                : isFocused
                ? 'text-orange-500'
                : 'text-gray-400'
            }
          `}
          style={{ left: Icon ? '3rem' : '1rem' }}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-slideDown">
          {error}
        </p>
      )}
    </div>
  );
};

const GenderSelector = ({ value, onChange, error }) => {
  const genders = [
    { value: 'male', label: 'Male', emoji: '👨' },
    { value: 'female', label: 'Female', emoji: '👩' },
    { value: 'other', label: 'Other', emoji: '🧑' },
  ];

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-3">
        Gender
      </label>
      <div className="grid grid-cols-3 gap-3">
        {genders.map((gender) => (
          <button
            key={gender.value}
            type="button"
            onClick={() => onChange('gender', gender.value)}
            className={`
              p-3 md:p-4 rounded-xl border-2 transition-all duration-200 text-center
              ${
                value === gender.value
                  ? 'border-orange-400 bg-orange-50 shadow-sm shadow-orange-500/10'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <span className="text-2xl block mb-1">{gender.emoji}</span>
            <span
              className={`text-sm font-semibold ${
                value === gender.value ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              {gender.label}
            </span>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-slideDown">
          {error}
        </p>
      )}
    </div>
  );
};

const StepOne = ({ formData, updateField, errors }) => {
  const formatCNIC = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
  };

  const handleCNICChange = (name, value) => {
    const formatted = formatCNIC(value);
    updateField(name, formatted);
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
          <HiOutlineUser className="w-7 h-7 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Personal Information
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Tell us about yourself to get started
        </p>
      </div>

      <div className="space-y-5">
        <FloatingInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={updateField}
          error={errors.fullName}
          icon={HiOutlineUser}
          placeholder="Enter your full name"
        />

        <FloatingInput
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={updateField}
          error={errors.phone}
          icon={HiOutlinePhone}
          type="tel"
          placeholder="+92 300 1234567"
        />

        <FloatingInput
          label="CNIC Number"
          name="cnic"
          value={formData.cnic}
          onChange={handleCNICChange}
          error={errors.cnic}
          icon={HiOutlineIdentification}
          placeholder="12345-1234567-1"
          maxLength={15}
        />

        <GenderSelector
          value={formData.gender}
          onChange={updateField}
          error={errors.gender}
        />

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Date of Birth
          </label>
          <div
            className={`
            relative border-2 rounded-xl transition-all duration-200
            ${
              errors.dateOfBirth
                ? 'border-red-300 bg-red-50/30'
                : 'border-gray-200 bg-white hover:border-gray-300 focus-within:border-orange-400 focus-within:shadow-sm focus-within:shadow-orange-500/10'
            }
          `}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <HiOutlineCalendar className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateField('dateOfBirth', e.target.value)}
              max={
                new Date(
                  new Date().setFullYear(new Date().getFullYear() - 18)
                )
                  .toISOString()
                  .split('T')[0]
              }
              className="w-full bg-transparent pl-12 pr-4 py-4 outline-none text-gray-800 font-medium text-sm md:text-base"
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-slideDown">
              {errors.dateOfBirth}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;