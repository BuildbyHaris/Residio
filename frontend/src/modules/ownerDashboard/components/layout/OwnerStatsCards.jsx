import { Home, CheckCircle, Clock, Wallet } from "lucide-react";

const StatCard = ({ icon: Icon, count, label, onViewAll }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
      <p className="text-sm text-gray-500">{label}</p>
      <button
        onClick={onViewAll}
        className="text-xs text-orange-500 hover:text-orange-600 font-medium mt-0.5"
      >
        View all
      </button>
    </div>
  </div>
);

const OwnerStatsCards = ({ hostels }) => {
  const total = hostels.length;
  const active = hostels.filter((h) => h.status === "Active").length;
  const pending = hostels.filter((h) => h.status === "Inactive").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Home} count={total} label="Total Properties" />
      <StatCard icon={CheckCircle} count={active} label="Active Listings" />
      <StatCard icon={Clock} count={pending} label="Inactive / Pending" />
      <StatCard
        icon={Wallet}
        count="Rs. 0"
        label="Total Earnings"
      />
    </div>
  );
};

export default OwnerStatsCards;