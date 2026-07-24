import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';
import AdminLayout from '../components/AdminLayout';
import VerificationDetails from '../components/VerificationDetails';
import ApproveVerificationModal from '../components/ApproveVerificationModal';
import RejectVerificationModal from '../components/RejectVerificationModal';
import { DetailsSkeleton } from '../components/AdminLoading';
import { useVerificationDetails, useVerificationActions } from '../hooks/useOwnerVerifications';

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
  const s = status?.toLowerCase() || 'pending';
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${styles[s] || styles.pending}`}>
      {labels[s] || status}
    </span>
  );
};

const OwnerVerificationDetailsPage = () => {
  const { verificationId } = useParams();
  const navigate = useNavigate();

  const [admin] = useState(() => {
    try {
      const stored = localStorage.getItem('adminInfo');
      return stored ? JSON.parse(stored) : { name: 'Admin' };
    } catch {
      return { name: 'Admin' };
    }
  });

  const { verification, loading, error, refetch } = useVerificationDetails(verificationId);
  const { approve, reject, approving, rejecting } = useVerificationActions();

  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const applicantName =
    verification?.userId?.name ||
    verification?.userId?.fullName ||
    verification?.applicantName ||
    'Applicant';

  const isPending = verification?.status === 'pending';

  const handleApproveConfirm = async () => {
    const result = await approve(verificationId);
    if (result.success) {
      toast.success('Owner verification approved successfully.');
      setApproveModal(false);
      refetch();
    } else {
      toast.error(result.message);
    }
  };

  const handleRejectConfirm = async (reason) => {
    const result = await reject(verificationId, reason);
    if (result.success) {
      toast.success('Owner verification rejected successfully.');
      setRejectModal(false);
      refetch();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AdminLayout admin={admin}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/owner-verifications')}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <HiOutlineArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1e293b]">
              Verification Details
            </h1>
            {verification && (
              <p className="text-sm text-gray-500 mt-0.5">
                {applicantName} • {verification.businessName || 'N/A'}
              </p>
            )}
          </div>
        </div>

        {verification && (
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={verification.status} />
            {isPending && (
              <>
                <button
                  onClick={() => setApproveModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-green-500 rounded-xl hover:bg-green-600 transition-all shadow-sm"
                >
                  <HiOutlineCheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => setRejectModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all shadow-sm"
                >
                  <HiOutlineXCircle className="w-4 h-4" />
                  Reject
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <DetailsSkeleton />
      ) : error ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Unable to load details</h3>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/admin/owner-verifications')}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={refetch}
              className="px-5 py-2.5 bg-[#ec6a52] text-white text-sm font-medium rounded-xl hover:bg-[#e35a41] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : verification ? (
        <>
          <VerificationDetails verification={verification} />

          {/* Review Info (if already reviewed) */}
          {verification.status !== 'pending' && (
            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-[#1e293b] mb-4">Review Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Status</p>
                  <StatusBadge status={verification.status} />
                </div>
                {verification.reviewedAt && (
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Reviewed At</p>
                    <p className="text-sm font-medium text-[#1e293b]">
                      {new Date(verification.reviewedAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                )}
                {verification.rejectionReason && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Rejection Reason</p>
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3 border border-red-100">
                      {verification.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : null}

      {/* Modals */}
      <ApproveVerificationModal
        isOpen={approveModal}
        onClose={() => setApproveModal(false)}
        onConfirm={handleApproveConfirm}
        loading={approving}
        applicantName={applicantName}
      />
      <RejectVerificationModal
        isOpen={rejectModal}
        onClose={() => setRejectModal(false)}
        onConfirm={handleRejectConfirm}
        loading={rejecting}
        applicantName={applicantName}
      />
    </AdminLayout>
  );
};

export default OwnerVerificationDetailsPage;