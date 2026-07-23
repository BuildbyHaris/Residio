import React from 'react';
import { useNavigate } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  };

  const labels = {
    pending: 'Pending Verification',
    approved: 'Approved',
    rejected: 'Rejected',
  };

  const normalizedStatus = status?.toLowerCase() || 'pending';

  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-1
        rounded-full
        text-xs font-medium
        border
        ${styles[normalizedStatus] || styles.pending}
      `}
    >
      {labels[normalizedStatus] || status}
    </span>
  );
};

const VerificationTableRow = ({
  verification,
  onApprove,
  onReject,
}) => {
  const navigate = useNavigate();

  // ============================================================
  // Applicant Information
  // Backend response uses `user`, NOT `userId`
  // ============================================================

  const applicant = verification?.user || {};

  const applicantName =
    applicant?.name ||
    verification?.fullName ||
    verification?.applicantName ||
    'Unknown Applicant';

  const applicantEmail =
    applicant?.email ||
    'No email available';

  const applicantPhone =
    applicant?.phone ||
    verification?.phone ||
    'No phone available';

  // ============================================================
  // Profile Image
  // Backend response:
  //
  // user: {
  //   profileImage: {
  //     url: "...",
  //     publicId: "..."
  //   }
  // }
  // ============================================================

  const profileImage =
    applicant?.profileImage?.url ||
    applicant?.avatar ||
    applicant?.profilePicture ||
    '';

  // ============================================================
  // Business Information
  // ============================================================

  const businessName =
    verification?.businessName ||
    'N/A';

  const businessType =
    verification?.businessType ||
    '';

  // ============================================================
  // Submission Date
  // ============================================================

  const submittedDate = verification?.createdAt
    ? new Date(verification.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A';

  // ============================================================
  // Status
  // ============================================================

  const status =
    verification?.status?.toLowerCase() ||
    'pending';

  // ============================================================
  // Verification ID
  // ============================================================

  const verificationId =
    verification?._id;

  // ============================================================
  // Avatar Initial
  // ============================================================

  const avatarInitial =
    applicantName?.charAt(0)?.toUpperCase() || '?';

  // ============================================================
  // Navigate to Details
  // ============================================================

  const handleViewDetails = () => {
    if (!verificationId) return;

    navigate(
      `/admin/owner-verifications/${verificationId}`
    );
  };

  return (
    <tr className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">

      {/* ======================================================
          Applicant / Business
      ======================================================= */}

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">

          {/* Profile Image / Initial */}
          <div
            className="
              w-10 h-10
              rounded-full
              bg-gradient-to-br
              from-gray-200
              to-gray-300
              flex items-center
              justify-center
              flex-shrink-0
              overflow-hidden
            "
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt={applicantName}
                className="w-full h-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <span className="text-sm font-semibold text-gray-600">
                {avatarInitial}
              </span>
            )}
          </div>

          {/* Applicant Details */}
          <div className="min-w-0">

            {/* Applicant Name */}
            <p
              className="
                text-sm
                font-medium
                text-[#1e293b]
                truncate
              "
            >
              {applicantName}
            </p>

            {/* Business Name */}
            <p
              className="
                text-xs
                text-gray-500
                truncate
              "
            >
              {businessName}
            </p>

            {/* Email */}
            <p
              className="
                text-xs
                text-gray-400
                truncate
              "
            >
              {applicantEmail}
            </p>

          </div>
        </div>
      </td>

      {/* ======================================================
          Contact
      ======================================================= */}

      <td className="px-4 py-3.5">
        <div className="space-y-0.5">
          <p className="text-sm text-gray-600 whitespace-nowrap">
            {applicantPhone}
          </p>

          {businessType && (
            <p className="text-xs text-gray-400 capitalize">
              {businessType}
            </p>
          )}
        </div>
      </td>

      {/* ======================================================
          Submitted On
      ======================================================= */}

      <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">
        {submittedDate}
      </td>

      {/* ======================================================
          Status
      ======================================================= */}

      <td className="px-4 py-3.5">
        <StatusBadge status={status} />
      </td>

      {/* ======================================================
          Actions
      ======================================================= */}

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">

          {/* View Details */}
          <button
            type="button"
            onClick={handleViewDetails}
            disabled={!verificationId}
            className="
              px-3
              py-1.5
              text-xs
              font-medium
              text-gray-700
              bg-white
              border
              border-gray-200
              rounded-lg
              hover:bg-gray-50
              hover:border-gray-300
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            View Details
          </button>

          {/* Approve */}
          {status === 'pending' && (
            <>
              <button
                type="button"
                onClick={() =>
                  onApprove?.(verification)
                }
                className="
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-white
                  bg-green-500
                  rounded-lg
                  hover:bg-green-600
                  transition-all
                "
              >
                Approve
              </button>

              {/* Reject */}
              <button
                type="button"
                onClick={() =>
                  onReject?.(verification)
                }
                className="
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-white
                  bg-red-500
                  rounded-lg
                  hover:bg-red-600
                  transition-all
                "
              >
                Reject
              </button>
            </>
          )}

        </div>
      </td>

    </tr>
  );
};

export default VerificationTableRow;