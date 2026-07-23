import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  HiOutlineShieldCheck,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineRefresh,
  HiOutlineDocumentText,
} from 'react-icons/hi';

import AdminLayout from '../components/AdminLayout';
import ApproveVerificationModal from '../components/ApproveVerificationModal';
import RejectVerificationModal from '../components/RejectVerificationModal';
import { TableSkeleton } from '../components/AdminLoading';

import {
  useOwnerVerifications,
  useVerificationActions,
} from '../hooks/useOwnerVerifications';


/* ============================================================
   STATUS BADGE
============================================================ */

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

  const normalizedStatus =
    status?.toLowerCase() || 'pending';

  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-1
        rounded-full
        text-xs font-medium
        border
        whitespace-nowrap
        ${styles[normalizedStatus] || styles.pending}
      `}
    >
      {labels[normalizedStatus] || status}
    </span>
  );
};


/* ============================================================
   DOCUMENT COUNT
============================================================ */

const DocumentCount = ({ verification }) => {

  const documents = [
    verification?.cnicFront,
    verification?.cnicBack,
    verification?.selfieWithCnic,
    verification?.ownershipProof,
  ].filter((document) => document?.url);

  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-600">
      <HiOutlineDocumentText className="w-4 h-4 text-gray-400" />

      <span>
        {documents.length} document
        {documents.length !== 1 ? 's' : ''}
      </span>
    </div>
  );
};


/* ============================================================
   MAIN PAGE
============================================================ */

const OwnerVerifications = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const limit = 10;


  /* ==========================================================
     ADMIN
  ========================================================== */

  const [admin] = useState(() => {

    try {

      const stored =
        localStorage.getItem('adminInfo');

      return stored
        ? JSON.parse(stored)
        : { name: 'Admin' };

    } catch {

      return {
        name: 'Admin',
      };

    }

  });


  /* ==========================================================
     FETCH VERIFICATIONS
  ========================================================== */

  const {
    verifications,
    pagination,
    loading,
    error,
    refetch,
  } = useOwnerVerifications(
    page,
    limit
  );


  /* ==========================================================
     ACTIONS
  ========================================================== */

  const {
    approve,
    reject,
    approving,
    rejecting,
  } = useVerificationActions();


  /* ==========================================================
     MODALS
  ========================================================== */

  const [
    approveModal,
    setApproveModal,
  ] = useState({
    open: false,
    verification: null,
  });


  const [
    rejectModal,
    setRejectModal,
  ] = useState({
    open: false,
    verification: null,
  });


  /* ==========================================================
     APPLICANT NAME
     
     IMPORTANT:
     Backend returns `user`, NOT `userId`
  ========================================================== */

  const getApplicantName = (verification) => {

    return (
      verification?.user?.name ||
      verification?.fullName ||
      'Unknown Applicant'
    );

  };


  /* ==========================================================
     APPLICANT EMAIL
  ========================================================== */

  const getApplicantEmail = (verification) => {

    return (
      verification?.user?.email ||
      'No email available'
    );

  };


  /* ==========================================================
     APPLICANT PHONE
  ========================================================== */

  const getApplicantPhone = (verification) => {

    return (
      verification?.user?.phone ||
      verification?.phone ||
      'No phone available'
    );

  };


  /* ==========================================================
     PROFILE IMAGE
  ========================================================== */

  const getApplicantImage = (verification) => {

    return (
      verification?.user?.profileImage?.url ||
      verification?.user?.avatar ||
      verification?.user?.profilePicture ||
      ''
    );

  };


  /* ==========================================================
     APPROVE
  ========================================================== */

  const handleApproveConfirm = async () => {

    const result =
      await approve(
        approveModal.verification?._id
      );


    if (result.success) {

      toast.success(
        'Owner verification approved successfully.'
      );

      setApproveModal({
        open: false,
        verification: null,
      });

      refetch();

    } else {

      toast.error(
        result.message
      );

    }

  };


  /* ==========================================================
     REJECT
  ========================================================== */

  const handleRejectConfirm = async (
    reason
  ) => {

    const result =
      await reject(
        rejectModal.verification?._id,
        reason
      );


    if (result.success) {

      toast.success(
        'Owner verification rejected successfully.'
      );

      setRejectModal({
        open: false,
        verification: null,
      });

      refetch();

    } else {

      toast.error(
        result.message
      );

    }

  };


  /* ==========================================================
     RENDER
  ========================================================== */

  return (

    <AdminLayout admin={admin}>

      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div
        className="
          flex flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-6
        "
      >

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-[#1e293b]
            "
          >
            Owner Verifications
          </h1>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Review and manage owner verification requests.
          </p>

        </div>


        {/* Refresh */}

        <button
          onClick={refetch}
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2.5
            text-sm
            font-medium
            text-gray-700
            bg-white
            border
            border-gray-200
            rounded-xl
            hover:bg-gray-50
            transition-all
            disabled:opacity-50
          "
        >

          <HiOutlineRefresh
            className={`
              w-4 h-4
              ${loading ? 'animate-spin' : ''}
            `}
          />

          Refresh

        </button>

      </div>


      {/* ======================================================
          LOADING
      ======================================================= */}

      {loading ? (

        <TableSkeleton
          rows={limit}
        />

      ) : error ? (

        /* ====================================================
           ERROR
        ===================================================== */

        <div
          className="
            bg-white
            rounded-xl
            p-8
            shadow-sm
            border
            border-gray-100
            text-center
          "
        >

          <div
            className="
              w-16 h-16
              bg-red-50
              rounded-full
              flex items-center
              justify-center
              mx-auto
              mb-4
            "
          >

            <svg
              className="w-8 h-8 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >

              <path
                fillRule="evenodd"
                d="
                  M18 10a8 8 0 11-16 0
                  8 8 0 0116 0zm-7 4a1 1
                  0 11-2 0 1 1 0 012 0zm-1-9a1 1
                  0 00-1 1v4a1 1 0
                  102 0V6a1 1 0 00-1-1z
                "
                clipRule="evenodd"
              />

            </svg>

          </div>


          <h3
            className="
              text-lg
              font-semibold
              text-[#1e293b]
              mb-2
            "
          >
            Unable to load verifications
          </h3>


          <p
            className="
              text-sm
              text-gray-500
              mb-4
            "
          >
            {error}
          </p>


          <button
            onClick={refetch}
            className="
              px-5
              py-2.5
              bg-[#ec6a52]
              text-white
              text-sm
              font-medium
              rounded-xl
              hover:bg-[#e35a41]
            "
          >
            Try Again
          </button>

        </div>

      ) : verifications.length === 0 ? (

        /* ====================================================
           EMPTY STATE
        ===================================================== */

        <div
          className="
            bg-white
            rounded-xl
            p-12
            shadow-sm
            border
            border-gray-100
            text-center
          "
        >

          <div
            className="
              w-20 h-20
              bg-green-50
              rounded-full
              flex items-center
              justify-center
              mx-auto
              mb-5
            "
          >

            <HiOutlineShieldCheck
              className="
                w-10 h-10
                text-green-500
              "
            />

          </div>


          <h3
            className="
              text-xl
              font-bold
              text-[#1e293b]
              mb-2
            "
          >
            You're all caught up!
          </h3>


          <p
            className="
              text-sm
              text-gray-500
              max-w-md
              mx-auto
            "
          >
            There are no owner verification requests
            waiting for review.
          </p>

        </div>

      ) : (

        <>

          {/* ==================================================
              TABLE
          =================================================== */}

          <div
            className="
              bg-white
              rounded-xl
              shadow-sm
              border
              border-gray-100
              overflow-hidden
            "
          >

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1200px]">

                <thead>

                  <tr
                    className="
                      bg-gray-50/80
                      border-b
                      border-gray-100
                    "
                  >

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Applicant
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Contact
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Business
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Location
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Experience
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Documents
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Submitted
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {verifications.map(
                    (verification) => {

                      const applicantName =
                        getApplicantName(
                          verification
                        );


                      const applicantEmail =
                        getApplicantEmail(
                          verification
                        );


                      const applicantPhone =
                        getApplicantPhone(
                          verification
                        );


                      const profileImage =
                        getApplicantImage(
                          verification
                        );


                      const initial =
                        applicantName
                          .charAt(0)
                          .toUpperCase();


                      const status =
                        verification?.status
                          ?.toLowerCase() ||
                        'pending';


                      return (

                        <tr
                          key={
                            verification._id
                          }
                          className="
                            border-t
                            border-gray-50
                            hover:bg-gray-50/50
                            transition-colors
                          "
                        >

                          {/* ==============================
                              APPLICANT
                          =============================== */}

                          <td className="px-4 py-4">

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              <div
                                className="
                                  w-10 h-10
                                  rounded-full
                                  bg-gradient-to-br
                                  from-gray-200
                                  to-gray-300
                                  flex
                                  items-center
                                  justify-center
                                  flex-shrink-0
                                  overflow-hidden
                                "
                              >

                                {profileImage ? (

                                  <img
                                    src={profileImage}
                                    alt={
                                      applicantName
                                    }
                                    className="
                                      w-full
                                      h-full
                                      object-cover
                                    "
                                  />

                                ) : (

                                  <span
                                    className="
                                      text-sm
                                      font-semibold
                                      text-gray-600
                                    "
                                  >
                                    {initial}
                                  </span>

                                )}

                              </div>


                              <div
                                className="
                                  min-w-0
                                "
                              >

                                <p
                                  className="
                                    text-sm
                                    font-medium
                                    text-[#1e293b]
                                  "
                                >
                                  {applicantName}
                                </p>


                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                    mt-0.5
                                  "
                                >
                                  {applicantEmail}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* ==============================
                              CONTACT
                          =============================== */}

                          <td className="px-4 py-4">

                            <p
                              className="
                                text-sm
                                text-gray-600
                              "
                            >
                              {applicantPhone}
                            </p>

                          </td>


                          {/* ==============================
                              BUSINESS
                          =============================== */}

                          <td className="px-4 py-4">

                            <p
                              className="
                                text-sm
                                font-medium
                                text-gray-700
                              "
                            >
                              {verification.businessName ||
                                '—'}
                            </p>


                            <p
                              className="
                                text-xs
                                text-gray-400
                                capitalize
                                mt-0.5
                              "
                            >
                              {verification.businessType ||
                                '—'}
                            </p>

                          </td>


                          {/* ==============================
                              LOCATION
                          =============================== */}

                          <td className="px-4 py-4">

                            <p
                              className="
                                text-sm
                                text-gray-600
                              "
                            >
                              {verification.city ||
                                '—'}
                            </p>


                            <p
                              className="
                                text-xs
                                text-gray-400
                                mt-0.5
                              "
                            >
                              {verification.province ||
                                '—'}
                            </p>

                          </td>


                          {/* ==============================
                              EXPERIENCE
                          =============================== */}

                          <td className="px-4 py-4">

                            <span
                              className="
                                text-sm
                                text-gray-600
                              "
                            >
                              {verification.experience ??
                                '—'} years
                            </span>

                          </td>


                          {/* ==============================
                              DOCUMENTS
                          =============================== */}

                          <td className="px-4 py-4">

                            <DocumentCount
                              verification={
                                verification
                              }
                            />

                          </td>


                          {/* ==============================
                              SUBMITTED
                          =============================== */}

                          <td
                            className="
                              px-4 py-4
                              text-sm
                              text-gray-600
                              whitespace-nowrap
                            "
                          >

                            {verification.createdAt

                              ? new Date(
                                  verification.createdAt
                                ).toLocaleDateString(
                                  'en-GB',
                                  {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  }
                                )

                              : '—'}

                          </td>


                          {/* ==============================
                              STATUS
                          =============================== */}

                          <td className="px-4 py-4">

                            <StatusBadge
                              status={
                                verification.status
                              }
                            />

                          </td>


                          {/* ==============================
                              ACTIONS
                          =============================== */}

                          <td className="px-4 py-4">

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/admin/owner-verifications/${verification._id}`
                                  )
                                }
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
                                "
                              >
                                View Details
                              </button>


                              {status ===
                                'pending' && (

                                <>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setApproveModal({
                                        open: true,
                                        verification,
                                      })
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
                                    "
                                  >
                                    Approve
                                  </button>


                                  <button
                                    type="button"
                                    onClick={() =>
                                      setRejectModal({
                                        open: true,
                                        verification,
                                      })
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

                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* ==================================================
              PAGINATION
          =================================================== */}

          {pagination.totalPages > 1 && (

            <div
              className="
                flex
                items-center
                justify-between
                mt-6
              "
            >

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Page {pagination.currentPage}
                {' '}of{' '}
                {pagination.totalPages}

                {pagination.total > 0 && (

                  <span className="ml-2">

                    (
                    {pagination.total}
                    {' '}total)

                  </span>

                )}

              </p>


              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <button
                  onClick={() =>
                    setPage(
                      (p) =>
                        Math.max(
                          1,
                          p - 1
                        )
                    )
                  }
                  disabled={page <= 1}
                  className="
                    p-2
                    rounded-lg
                    border
                    border-gray-200
                    hover:bg-gray-50
                    disabled:opacity-50
                  "
                >

                  <HiOutlineChevronLeft
                    className="
                      w-4 h-4
                      text-gray-600
                    "
                  />

                </button>


                {[...Array(
                  Math.min(
                    5,
                    pagination.totalPages
                  )
                )].map(
                  (_, index) => {

                    const pageNumber =
                      index + 1;


                    return (

                      <button
                        key={
                          pageNumber
                        }
                        onClick={() =>
                          setPage(
                            pageNumber
                          )
                        }
                        className={`
                          w-9 h-9
                          rounded-lg
                          text-sm
                          font-medium
                          ${
                            page ===
                            pageNumber
                              ? 'bg-[#ec6a52] text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >

                        {pageNumber}

                      </button>

                    );

                  }
                )}


                <button
                  onClick={() =>
                    setPage(
                      (p) =>
                        Math.min(
                          pagination.totalPages,
                          p + 1
                        )
                    )
                  }
                  disabled={
                    page >=
                    pagination.totalPages
                  }
                  className="
                    p-2
                    rounded-lg
                    border
                    border-gray-200
                    hover:bg-gray-50
                    disabled:opacity-50
                  "
                >

                  <HiOutlineChevronRight
                    className="
                      w-4 h-4
                      text-gray-600
                    "
                  />

                </button>

              </div>

            </div>

          )}

        </>

      )}


      {/* ======================================================
          APPROVE MODAL
      ======================================================= */}

      <ApproveVerificationModal
        isOpen={
          approveModal.open
        }
        onClose={() =>
          setApproveModal({
            open: false,
            verification: null,
          })
        }
        onConfirm={
          handleApproveConfirm
        }
        loading={
          approving
        }
        applicantName={
          getApplicantName(
            approveModal.verification
          )
        }
      />


      {/* ======================================================
          REJECT MODAL
      ======================================================= */}

      <RejectVerificationModal
        isOpen={
          rejectModal.open
        }
        onClose={() =>
          setRejectModal({
            open: false,
            verification: null,
          })
        }
        onConfirm={
          handleRejectConfirm
        }
        loading={
          rejecting
        }
        applicantName={
          getApplicantName(
            rejectModal.verification
          )
        }
      />

    </AdminLayout>

  );

};


export default OwnerVerifications;