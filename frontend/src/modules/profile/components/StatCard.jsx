function StatCard({ icon: Icon, value, label, onViewAll }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3 border border-gray-100">
      <div className="w-12 h-12 rounded-full bg-[#FDEDE3] flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#F5732C]" />
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-500 text-sm mt-1">{label}</p>
      </div>
      <button
        onClick={onViewAll}
        className="text-[#F5732C] text-sm font-medium hover:underline text-left mt-auto"
      >
        View all
      </button>
    </div>
  );
}

export default StatCard;