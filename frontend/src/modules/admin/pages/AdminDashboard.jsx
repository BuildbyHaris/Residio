import React, { useState } from 'react';
import {
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
  HiOutlineCurrencyRupee,
  HiOutlineTrendingUp,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import DashboardStatCard from '../components/DashboardStatCard';
import VerificationTable from '../components/VerificationTable';
import ApproveVerificationModal from '../components/ApproveVerificationModal';
import RejectVerificationModal from '../components/RejectVerificationModal';
import { DashboardSkeleton } from '../components/AdminLoading';
import useAdminDashboard from '../hooks/useAdminDashboard';
import { useVerificationActions } from '../hooks/useOwnerVerifications';

const AdminDashboard = () => {
  // Admin info – in production this would come from auth context
  const [admin] = useState(() => {
    try {
      const stored = localStorage.getItem('adminInfo');
      return stored ? JSON.parse(stored) : { name: 'Admin' };
    } catch {
      return { name: 'Admin' };
    }
  });

  const { stats, pendingVerifications, loading, error, refetch } = useAdminDashboard();
  const { approve, reject, approving, rejecting } = useVerificationActions();

  const [approveModal, setApproveModal] = useState({ open: false, verification: null });
  const [rejectModal, setRejectModal] = useState({ open: false, verification: null });

  const handleApproveClick = (verification) => {
    setApproveModal({ open: true, verification });
  };

  const handleRejectClick = (verification) => {
    setRejectModal({ open: true, verification });
  };

  const handleApproveConfirm = async () => {
    const result = await approve(approveModal.verification?._id);
    if (result.success) {
      toast.success('Owner verification approved successfully.');
      setApproveModal({ open: false, verification: null });
      refetch();
    } else {
      toast.error(result.message);
    }
  };

  const handleRejectConfirm = async (reason) => {
    const result = await reject(rejectModal.verification?._id, reason);
    if (result.success) {
      toast.success('Owner verification rejected successfully.');
      setRejectModal({ open: false, verification: null });
      refetch();
    } else {
      toast.error(result.message);
    }
  };

  // Build stat cards from real backend data
  const getStatCards = () => {
    if (!stats) return [];

    return [
      {
        icon: HiOutlineUsers,
        iconBgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
        title: 'Total Users',
        value: stats.users?.total ?? 0,
        description: 'All registered users',
      },
      {
        icon: HiOutlineShieldCheck,
        iconBgColor: 'bg-orange-50',
        iconColor: 'text-[#ec6a52]',
        title: 'Pending Owner Verifications',
        value: stats.ownerVerification?.pending ?? 0,
        description: 'Needs admin review',
      },
      {
        icon: HiOutlineOfficeBuilding,
        iconBgColor: 'bg-green-50',
        iconColor: 'text-green-600',
        title: 'Pending Properties',
        value: stats.properties?.pending ?? 0,
        description: 'Awaiting approval',
      },
      {
        icon: HiOutlineCalendar,
        iconBgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
        title: 'Total Properties',
        value: stats.properties?.total ?? 0,
        description: 'Across all properties',
      },
      {
        icon: HiOutlineCurrencyRupee,
        iconBgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        title: 'Approved Verifications',
        value: stats.ownerVerification?.approved ?? 0,
        description: 'Verified owners',
      },
      {
        icon: HiOutlineTrendingUp,
        iconBgColor: 'bg-indigo-50',
        iconColor: 'text-indigo-600',
        title: 'Total Owners',
        value: stats.users?.owners ?? 0,
        description: 'Active property owners',
      },
    ];
  };

  const getApplicantName = (verification) => {
    return (
      verification?.user?.name ||
      verification?.fullName ||
      verification?.applicantName ||
      'Unknown Applicant'
    );
  };

  const approveApplicantName = getApplicantName(
    approveModal.verification
  );

  const rejectApplicantName = getApplicantName(
    rejectModal.verification
  );

  return (
    <AdminLayout admin={admin}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1e293b]">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's what's happening on your platform.
        </p>
      </div>

      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        /* Error State */
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Unable to load dashboard</h3>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-5 py-2.5 bg-[#ec6a52] text-white text-sm font-medium rounded-xl hover:bg-[#e35a41] transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {getStatCards().map((card, index) => (
              <DashboardStatCard key={index} {...card} />
            ))}
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Pending Owner Verifications */}
            <VerificationTable
              verifications={pendingVerifications}
              title="Pending Owner Verifications"
              showViewAll={true}
              onApprove={handleApproveClick}
              onReject={handleRejectClick}
            />

            {/* Pending Property Approvals - Coming Soon */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <HiOutlineCheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1e293b]">Pending Property Approvals</h3>
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-medium border border-amber-100">
                  Coming Soon
                </span>
              </div>
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                  <HiOutlineOfficeBuilding className="w-8 h-8 text-amber-500" />
                </div>
                <h4 className="text-sm font-semibold text-[#1e293b] mb-1">Coming Soon</h4>
                <p className="text-xs text-gray-500 text-center max-w-xs">
                  Property approval management will be available once the related Admin features are connected.
                </p>
              </div>
            </div>
          </div>

          {/* Charts Row - Placeholder */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                    <HiOutlineCurrencyRupee className="w-4 h-4 text-[#ec6a52]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1e293b]">Revenue Trend</h3>
                </div>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-medium">
                  No data yet
                </span>
              </div>
              <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
                <HiOutlineTrendingUp className="w-10 h-10 text-gray-300 mb-2" />
                <p className="text-sm text-gray-400 font-medium">No analytics data available yet</p>
                <p className="text-xs text-gray-300 mt-1">Revenue tracking will appear here</p>
              </div>
            </div>

            {/* Users vs Owners */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <HiOutlineUsers className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1e293b]">New Users vs New Owners</h3>
                </div>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-medium">
                  No data yet
                </span>
              </div>
              <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
                <HiOutlineUsers className="w-10 h-10 text-gray-300 mb-2" />
                <p className="text-sm text-gray-400 font-medium">No analytics data available yet</p>
                <p className="text-xs text-gray-300 mt-1">User growth chart will appear here</p>
              </div>
            </div>
          </div>

          {/* Platform Health Banner */}
          <div className="bg-gradient-to-r from-[#ec6a52] to-[#e35a41] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute right-8 bottom-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Residio Platform Health</h3>
                <p className="text-sm text-white/80">
                  All systems are running smoothly. Keep up the great work!
                </p>
              </div>
              <button
                className="px-5 py-2.5 bg-white text-[#ec6a52] text-sm font-semibold rounded-xl hover:bg-orange-50 transition-colors flex items-center gap-2 flex-shrink-0"
                onClick={() => toast('System status details coming soon!', { icon: '✅' })}
              >
                View System Status
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ApproveVerificationModal
        isOpen={approveModal.open}
        onClose={() => setApproveModal({ open: false, verification: null })}
        onConfirm={handleApproveConfirm}
        loading={approving}
        applicantName={approveApplicantName}
      />

      <RejectVerificationModal
        isOpen={rejectModal.open}
        onClose={() => setRejectModal({ open: false, verification: null })}
        onConfirm={handleRejectConfirm}
        loading={rejecting}
        applicantName={rejectApplicantName}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;