// src/modules/findHostel/components/FindHostelSkeleton.jsx
const FindHostelSkeleton = () => (
  <div className="bg-white border border-[#EDEDED] rounded-2xl overflow-hidden animate-pulse">
    <div className="w-full h-[170px] bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="flex justify-between pt-3 border-t border-gray-100">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-7 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  </div>
);
export default FindHostelSkeleton;