import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import VerificationTableRow from './VerificationTableRow';

const VerificationTable = ({
  verifications = [],
  title = 'Pending Owner Verifications',
  showViewAll = false,
  onApprove,
  onReject,
  emptyMessage = "You're all caught up! There are no owner verification requests waiting for review.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

      {/* ======================================================
          Header
      ======================================================= */}

      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
            <HiOutlineShieldCheck className="w-4 h-4 text-[#ec6a52]" />
          </div>

          <h3 className="text-sm font-semibold text-[#1e293b]">
            {title}
          </h3>
        </div>

        {showViewAll && (
          <button
            type="button"
            onClick={() =>
              navigate('/admin/owner-verifications')
            }
            className="
              px-3
              py-1.5
              text-xs
              font-medium
              text-[#ec6a52]
              border
              border-[#ec6a52]/30
              rounded-lg
              hover:bg-orange-50
              transition-all
            "
          >
            View All
          </button>
        )}

      </div>

      {/* ======================================================
          Table Content
      ======================================================= */}

      {verifications.length > 0 ? (

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            {/* ==================================================
                Table Header
            =================================================== */}

            <thead>
              <tr className="bg-gray-50/80">

                {/* Owner / Business */}
                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Owner / Business
                </th>

                {/* Contact */}
                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Contact
                </th>

                {/* Submitted On */}
                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                    uppercase
                    tracking-wider
                    whitespace-nowrap
                  "
                >
                  Submitted On
                </th>

                {/* Status */}
                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Status
                </th>

                {/* Actions */}
                <th
                  className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Actions
                </th>

              </tr>
            </thead>

            {/* ==================================================
                Table Body
            =================================================== */}

            <tbody>

              {verifications.map((verification) => (

                <VerificationTableRow
                  key={verification?._id}
                  verification={verification}
                  onApprove={onApprove}
                  onReject={onReject}
                />

              ))}

            </tbody>

          </table>

        </div>

      ) : (

        /* ======================================================
           Empty State
        ======================================================= */

        <div className="flex flex-col items-center justify-center py-12 px-4">

          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">

            <svg
              className="w-8 h-8 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="
                  M10 18a8 8 0 100-16
                  8 8 0 000 16zm3.707-9.293
                  a1 1 0 00-1.414-1.414L9
                  10.586 7.707 9.293a1 1
                  0 00-1.414 1.414l2 2a1
                  1 0 001.414 0l4-4z
                "
                clipRule="evenodd"
              />
            </svg>

          </div>

          {/* Empty State Heading */}
          <h4 className="text-sm font-semibold text-[#1e293b] mb-1">
            You're all caught up!
          </h4>

          {/* Empty State Description */}
          <p className="text-xs text-gray-500 text-center max-w-xs">
            {emptyMessage}
          </p>

        </div>

      )}

    </div>
  );
};

export default VerificationTable;