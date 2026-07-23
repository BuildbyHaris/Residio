import React, { useState } from 'react';
import {
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineDocumentText,
  HiOutlineExternalLink,
  HiOutlinePhotograph,
  HiOutlineIdentification,
  HiOutlineCalendar,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineHome,
  HiOutlineBriefcase,
} from 'react-icons/hi';

/**
 * ============================================================
 * INFO FIELD
 * ============================================================
 */

const InfoField = ({ label, value, icon: Icon }) => {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>

      <div className="flex items-start gap-2">
        {Icon && (
          <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
        )}

        <p className="text-sm font-medium text-[#1e293b] break-words">
          {value !== null &&
          value !== undefined &&
          value !== ''
            ? value
            : '—'}
        </p>
      </div>
    </div>
  );
};

/**
 * ============================================================
 * DOCUMENT PREVIEW
 * Handles:
 * - Cloudinary images
 * - Cloudinary PDFs
 * - Missing documents
 * ============================================================
 */

const DocumentPreview = ({ doc, name }) => {
  const [imageError, setImageError] = useState(false);

  /**
   * Backend document structure:
   *
   * {
   *   url: "...",
   *   publicId: "..."
   * }
   */

  const url =
    typeof doc === 'string'
      ? doc
      : doc?.url || '';

  const publicId =
    typeof doc === 'object'
      ? doc?.publicId || ''
      : '';

  if (!url) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <HiOutlineDocumentText className="w-6 h-6 text-gray-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-[#1e293b]">
              {name}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Document not available
            </p>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Cloudinary URLs can sometimes have:
   * .pdf
   *
   * We also check the resource type in the URL.
   */

  const lowerUrl = url.toLowerCase();

  const isPdf =
    lowerUrl.includes('.pdf') ||
    lowerUrl.includes('/raw/upload/');

  /**
   * ============================================================
   * PDF DOCUMENT
   * ============================================================
   */

  if (isPdf) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <HiOutlineDocumentText className="w-6 h-6 text-red-500" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1e293b] truncate">
              {name}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              PDF Document
            </p>

            {publicId && (
              <p className="text-[10px] text-gray-300 mt-1 truncate">
                {publicId}
              </p>
            )}
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <HiOutlineExternalLink className="w-4 h-4" />
            View PDF
          </a>
        </div>
      </div>
    );
  }

  /**
   * ============================================================
   * IMAGE DOCUMENT
   * ============================================================
   */

  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors bg-white">
      {!imageError ? (
        <img
          src={url}
          alt={name}
          className="w-full h-56 object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-56 bg-gray-100 flex flex-col items-center justify-center gap-2">
          <HiOutlinePhotograph className="w-8 h-8 text-gray-400" />

          <p className="text-xs text-gray-500">
            Unable to load image
          </p>
        </div>
      )}

      {/* Hover Overlay */}

      {!imageError && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-xs font-semibold text-[#1e293b] shadow-lg transition-all hover:bg-gray-50"
          >
            <HiOutlineExternalLink className="w-4 h-4" />
            View Full Size
          </a>
        </div>
      )}

      {/* Document Name */}

      <div className="px-4 py-3 bg-white">
        <p className="text-sm font-semibold text-gray-700 truncate">
          {name}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Verification document
        </p>
      </div>
    </div>
  );
};

/**
 * ============================================================
 * PROFILE IMAGE
 * ============================================================
 */

const ApplicantProfileImage = ({ profileImage, name }) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl =
    profileImage?.url || '';

  if (!imageUrl || imageError) {
    return (
      <div className="w-20 h-20 rounded-full bg-orange-50 border-4 border-white shadow-md flex items-center justify-center">
        <HiOutlineUser className="w-8 h-8 text-[#ec6a52]" />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name || 'Applicant'}
      onError={() => setImageError(true)}
      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
    />
  );
};

/**
 * ============================================================
 * MAIN COMPONENT
 * ============================================================
 */

const VerificationDetails = ({ verification }) => {
  if (!verification) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500">
          Verification details are not available.
        </p>
      </div>
    );
  }

  /**
   * ============================================================
   * APPLICANT DATA
   *
   * Backend response:
   *
   * verification.user
   * ============================================================
   */

  const applicant = verification.user || {};

  const applicantName =
    applicant.name ||
    verification.fullName ||
    'Unknown Applicant';

  const applicantEmail =
    applicant.email || '—';

  const applicantPhone =
    applicant.phone ||
    verification.phone ||
    '—';

  const profileImage =
    applicant.profileImage || null;

  /**
   * ============================================================
   * PERSONAL INFORMATION
   * ============================================================
   */

  const fullName =
    verification.fullName ||
    applicant.name ||
    '—';

  const cnic =
    verification.cnic || '—';

  const gender =
    verification.gender || '—';

  const dateOfBirth =
    verification.dateOfBirth
      ? new Date(
          verification.dateOfBirth
        ).toLocaleDateString()
      : '—';

  /**
   * ============================================================
   * BUSINESS INFORMATION
   * ============================================================
   */

  const businessName =
    verification.businessName || '—';

  const businessType =
    verification.businessType || '—';

  const experience =
    verification.experience !== null &&
    verification.experience !== undefined
      ? `${verification.experience} year${
          verification.experience === 1
            ? ''
            : 's'
        }`
      : '—';

  /**
   * ============================================================
   * ADDRESS
   * ============================================================
   */

  const province =
    verification.province || '—';

  const city =
    verification.city || '—';

  const address =
    verification.address || '—';

  const postalCode =
    verification.postalCode || '—';

  /**
   * ============================================================
   * DOCUMENTS
   *
   * Backend returns individual fields,
   * NOT an array.
   * ============================================================
   */

  const documents = [
    {
      key: 'cnicFront',
      name: 'CNIC Front',
      document: verification.cnicFront,
    },
    {
      key: 'cnicBack',
      name: 'CNIC Back',
      document: verification.cnicBack,
    },
    {
      key: 'selfieWithCnic',
      name: 'Selfie With CNIC',
      document: verification.selfieWithCnic,
    },
    {
      key: 'ownershipProof',
      name: 'Ownership Proof',
      document: verification.ownershipProof,
    },
  ];

  const availableDocuments =
    documents.filter(
      (item) =>
        item.document?.url
    );

  return (
    <div className="space-y-6">

      {/* ======================================================
          APPLICANT INFORMATION
      ======================================================= */}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <HiOutlineUser className="w-4 h-4 text-blue-600" />
          </div>

          <h3 className="text-sm font-semibold text-[#1e293b]">
            Applicant Information
          </h3>
        </div>

        {/* Applicant Header */}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 mb-6 border-b border-gray-100">

          <ApplicantProfileImage
            profileImage={profileImage}
            name={applicantName}
          />

          <div className="text-center sm:text-left">

            <h4 className="text-lg font-bold text-[#1e293b]">
              {applicantName}
            </h4>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mt-2">

              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <HiOutlineMail className="w-4 h-4 text-gray-400" />

                <span className="text-sm text-gray-500">
                  {applicantEmail}
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <HiOutlinePhone className="w-4 h-4 text-gray-400" />

                <span className="text-sm text-gray-500">
                  {applicantPhone}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Applicant Details */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <InfoField
            label="Full Name"
            value={fullName}
            icon={HiOutlineUser}
          />

          <InfoField
            label="CNIC"
            value={cnic}
            icon={HiOutlineIdentification}
          />

          <InfoField
            label="Gender"
            value={gender}
            icon={HiOutlineUser}
          />

          <InfoField
            label="Date of Birth"
            value={dateOfBirth}
            icon={HiOutlineCalendar}
          />

        </div>

      </div>


      {/* ======================================================
          BUSINESS INFORMATION
      ======================================================= */}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

        <div className="flex items-center gap-2.5 mb-5">

          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
            <HiOutlineOfficeBuilding className="w-4 h-4 text-purple-600" />
          </div>

          <h3 className="text-sm font-semibold text-[#1e293b]">
            Business Information
          </h3>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <InfoField
            label="Business Name"
            value={businessName}
            icon={HiOutlineBriefcase}
          />

          <InfoField
            label="Business Type"
            value={businessType}
          />

          <InfoField
            label="Experience"
            value={experience}
          />

        </div>

      </div>


      {/* ======================================================
          ADDRESS
      ======================================================= */}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

        <div className="flex items-center gap-2.5 mb-5">

          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
            <HiOutlineLocationMarker className="w-4 h-4 text-green-600" />
          </div>

          <h3 className="text-sm font-semibold text-[#1e293b]">
            Address
          </h3>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <InfoField
            label="Province"
            value={province}
          />

          <InfoField
            label="City"
            value={city}
          />

          <InfoField
            label="Address"
            value={address}
            icon={HiOutlineHome}
          />

          <InfoField
            label="Postal Code"
            value={postalCode}
          />

        </div>

      </div>


      {/* ======================================================
          VERIFICATION DOCUMENTS
      ======================================================= */}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

        <div className="flex items-center gap-2.5 mb-6">

          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
            <HiOutlineDocumentText className="w-4 h-4 text-amber-600" />
          </div>

          <h3 className="text-sm font-semibold text-[#1e293b]">
            Verification Documents
          </h3>

          {availableDocuments.length > 0 && (
            <span className="text-xs text-gray-400">
              ({availableDocuments.length} document
              {availableDocuments.length !== 1
                ? 's'
                : ''}
              )
            </span>
          )}

        </div>

        {availableDocuments.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {availableDocuments.map(
              (item) => (
                <DocumentPreview
                  key={item.key}
                  doc={item.document}
                  name={item.name}
                />
              )
            )}

          </div>

        ) : (

          <div className="flex flex-col items-center justify-center py-8">

            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">

              <HiOutlineDocumentText className="w-6 h-6 text-gray-400" />

            </div>

            <p className="text-sm text-gray-500">
              No verification documents uploaded
            </p>

          </div>

        )}

      </div>


      {/* ======================================================
          VERIFICATION STATUS
      ======================================================= */}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

        <div className="flex items-center gap-2.5 mb-5">

          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
            <HiOutlineDocumentText className="w-4 h-4 text-[#ec6a52]" />
          </div>

          <h3 className="text-sm font-semibold text-[#1e293b]">
            Verification Status
          </h3>

        </div>

        <div className="flex flex-wrap items-center gap-4">

          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold capitalize ${
              verification.status === 'approved'
                ? 'bg-green-50 text-green-700'
                : verification.status === 'rejected'
                ? 'bg-red-50 text-red-700'
                : 'bg-orange-50 text-orange-700'
            }`}
          >
            {verification.status || 'Pending'}
          </span>

          {verification.createdAt && (
            <span className="text-xs text-gray-400">
              Submitted on{' '}
              {new Date(
                verification.createdAt
              ).toLocaleString()}
            </span>
          )}

        </div>

        {verification.rejectionReason && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-4">

            <p className="text-xs font-semibold text-red-700 mb-1">
              Rejection Reason
            </p>

            <p className="text-sm text-red-600">
              {verification.rejectionReason}
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default VerificationDetails;