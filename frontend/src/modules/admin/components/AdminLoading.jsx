import React from 'react';

const SkeletonPulse = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Stat Cards Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <SkeletonPulse className="w-12 h-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <SkeletonPulse className="h-3 w-24" />
              <SkeletonPulse className="h-7 w-16" />
              <SkeletonPulse className="h-3 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Tables Skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <SkeletonPulse className="h-5 w-48" />
            <SkeletonPulse className="h-8 w-20 rounded-lg" />
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex items-center gap-3 py-3">
                <SkeletonPulse className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <SkeletonPulse className="h-4 w-32" />
                  <SkeletonPulse className="h-3 w-24" />
                </div>
                <SkeletonPulse className="h-6 w-24 rounded-full" />
                <SkeletonPulse className="h-8 w-16 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-6 border-b border-gray-100">
      <SkeletonPulse className="h-6 w-56" />
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            {[...Array(7)].map((_, i) => (
              <th key={i} className="px-4 py-3">
                <SkeletonPulse className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, i) => (
            <tr key={i} className="border-t border-gray-50">
              {[...Array(7)].map((_, j) => (
                <td key={j} className="px-4 py-4">
                  <SkeletonPulse className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const DetailsSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center gap-4 mb-6">
      <SkeletonPulse className="h-8 w-8 rounded-lg" />
      <SkeletonPulse className="h-7 w-64" />
    </div>

    {/* Info Sections */}
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <SkeletonPulse className="h-5 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, j) => (
            <div key={j} className="space-y-2">
              <SkeletonPulse className="h-3 w-20" />
              <SkeletonPulse className="h-5 w-40" />
            </div>
          ))}
        </div>
      </div>
    ))}

    {/* Documents */}
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <SkeletonPulse className="h-5 w-48 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonPulse key={i} className="h-40 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

const AdminLoading = ({ type = 'dashboard' }) => {
  switch (type) {
    case 'dashboard':
      return <DashboardSkeleton />;
    case 'table':
      return <TableSkeleton />;
    case 'details':
      return <DetailsSkeleton />;
    default:
      return <DashboardSkeleton />;
  }
};

export default AdminLoading;