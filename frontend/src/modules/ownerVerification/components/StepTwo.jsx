// modules/ownerVerification/components/StepTwo.jsx

import React, { useState } from 'react';
import {
    HiOutlineLocationMarker,
    HiOutlineOfficeBuilding,
    HiOutlineBriefcase,
    HiOutlineUser,
    HiOutlineUserGroup,
} from 'react-icons/hi';
import { PROVINCES, CITIES } from '../validation/ownerVerification.schema';

const SelectInput = ({ label, name, value, onChange, options, error, icon: Icon, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
                {label}
            </label>
            <div
                className={`
          relative border-2 rounded-xl transition-all duration-200
          ${error
                        ? 'border-red-300 bg-red-50/30'
                        : isFocused
                            ? 'border-orange-400 bg-white shadow-sm shadow-orange-500/10'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                    }
        `}
            >
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                        <Icon
                            className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-orange-500' : 'text-gray-400'
                                }`}
                        />
                    </div>
                )}
                <select
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
            w-full bg-transparent outline-none text-gray-800 font-medium 
            ${Icon ? 'pl-12' : 'pl-4'} pr-10 py-4
            text-sm md:text-base appearance-none cursor-pointer
            ${!value ? 'text-gray-400' : ''}
          `}
                >
                    <option value="">{placeholder || `Select ${label}`}</option>
                    {options.map((opt) => (
                        <option
                            key={typeof opt === "object" ? opt.value : opt}
                            value={typeof opt === "object" ? opt.value : opt}
                        >
                            {typeof opt === "object" ? opt.label : opt}
                        </option>
                    ))}
                </select>
                {/* Custom arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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

const TextAreaInput = ({ label, name, value, onChange, error, icon: Icon, placeholder, rows = 3 }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
                {label}
            </label>
            <div
                className={`
          relative border-2 rounded-xl transition-all duration-200
          ${error
                        ? 'border-red-300 bg-red-50/30'
                        : isFocused
                            ? 'border-orange-400 bg-white shadow-sm shadow-orange-500/10'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                    }
        `}
            >
                {Icon && (
                    <div className="absolute left-4 top-4 pointer-events-none">
                        <Icon
                            className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-orange-500' : 'text-gray-400'
                                }`}
                        />
                    </div>
                )}
                <textarea
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    rows={rows}
                    className={`
            w-full bg-transparent outline-none text-gray-800 font-medium 
            ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4
            text-sm md:text-base resize-none
          `}
                />
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-slideDown">
                    {error}
                </p>
            )}
        </div>
    );
};

const FloatingInputSimple = ({ label, name, value, onChange, error, icon: Icon, placeholder, type = 'text', maxLength }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
                {label}
            </label>
            <div
                className={`
          relative border-2 rounded-xl transition-all duration-200
          ${error
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
                            className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-orange-500' : 'text-gray-400'
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
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`
            w-full bg-transparent outline-none text-gray-800 font-medium 
            ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4
            text-sm md:text-base
          `}
                />
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-slideDown">
                    {error}
                </p>
            )}
        </div>
    );
};

const BusinessTypeCard = ({ type, title, description, icon: Icon, isSelected, onSelect }) => {
    return (
        <button
            type="button"
            onClick={() => onSelect('businessType', type)}
            className={`
        w-full p-5 md:p-6 rounded-xl border-2 text-left transition-all duration-200 group
        ${isSelected
                    ? 'border-orange-400 bg-orange-50 shadow-md shadow-orange-500/10'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }
      `}
        >
            <div className="flex items-start gap-4">
                <div
                    className={`
            w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200
            ${isSelected ? 'bg-orange-100' : 'bg-gray-100 group-hover:bg-gray-200'}
          `}
                >
                    <Icon
                        className={`w-6 h-6 transition-colors duration-200 ${isSelected ? 'text-orange-500' : 'text-gray-400'
                            }`}
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4
                            className={`font-bold text-base ${isSelected ? 'text-orange-600' : 'text-gray-800'
                                }`}
                        >
                            {title}
                        </h4>
                        <div
                            className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${isSelected
                                    ? 'border-orange-500 bg-orange-500'
                                    : 'border-gray-300'
                                }
              `}
                        >
                            {isSelected && (
                                <svg
                                    className="w-3 h-3 text-white animate-scaleIn"
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
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
            </div>
        </button>
    );
};

const StepTwo = ({ formData, updateField, errors }) => {
    const availableCities = formData.province ? CITIES[formData.province] || [] : [];

    const handleProvinceChange = (name, value) => {
        updateField(name, value);
        updateField('city', '');
    };

    return (
        <div className="animate-fadeIn">
            {/* Address Section */}
            <div className="mb-10">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
                        <HiOutlineLocationMarker className="w-7 h-7 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Address Details</h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        Where is your property located?
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <SelectInput
                            label="Province"
                            name="province"
                            value={formData.province}
                            onChange={handleProvinceChange}
                            options={PROVINCES}
                            error={errors.province}
                            icon={HiOutlineLocationMarker}
                            placeholder="Select Province"
                        />

                        <SelectInput
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={updateField}
                            options={availableCities}
                            error={errors.city}
                            icon={HiOutlineOfficeBuilding}
                            placeholder={
                                formData.province ? 'Select City' : 'Select Province first'
                            }
                        />
                    </div>

                    <TextAreaInput
                        label="Full Address"
                        name="address"
                        value={formData.address}
                        onChange={updateField}
                        error={errors.address}
                        icon={HiOutlineLocationMarker}
                        placeholder="House/Building No., Street, Area"
                    />

                    <FloatingInputSimple
                        label="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={updateField}
                        error={errors.postalCode}
                        placeholder="e.g., 54000"
                        maxLength={5}
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-8" />

            {/* Business Section */}
            <div>
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
                        <HiOutlineBriefcase className="w-7 h-7 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Business Information
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        Tell us about your property business
                    </p>
                </div>

                <div className="space-y-5">
                    <FloatingInputSimple
                        label="Business Name"
                        name="businessName"
                        value={formData.businessName}
                        onChange={updateField}
                        error={errors.businessName}
                        icon={HiOutlineOfficeBuilding}
                        placeholder="Your business or property name"
                    />

                    {/* Business Type Cards */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-3">
                            Business Type
                        </label>
                        <div className="space-y-3">
                            <BusinessTypeCard
                                type="individual"
                                title="Individual"
                                description="Perfect for individuals listing their own property."
                                icon={HiOutlineUser}
                                isSelected={formData.businessType === 'individual'}
                                onSelect={updateField}
                            />
                            <BusinessTypeCard
                                type="company"
                                title="Company"
                                description="Registered business or property management company."
                                icon={HiOutlineUserGroup}
                                isSelected={formData.businessType === 'company'}
                                onSelect={updateField}
                            />
                        </div>
                        {errors.businessType && (
                            <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium animate-slideDown">
                                {errors.businessType}
                            </p>
                        )}
                    </div>

                    <SelectInput
                        label="Experience"
                        name="experience"
                        value={formData.experience}
                        onChange={updateField}
                        options={[
                            {
                                label: "Less than 1 year",
                                value: 1,
                            },
                            {
                                label: "1 - 3 years",
                                value: 2,
                            },
                            {
                                label: "3 - 5 years",
                                value: 3,
                            },
                            {
                                label: "5 - 10 years",
                                value: 4,
                            },
                            {
                                label: "10+ years",
                                value: 5,
                            },
                        ]}
                        error={errors.experience}
                        icon={HiOutlineBriefcase}
                        placeholder="Select your experience"
                    />
                </div>
            </div>
        </div>
    );
};

export default StepTwo;