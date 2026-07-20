import StatCard from "./StatCard";
import { statsConfig } from "../constants/stats";

function StatsGrid({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((item) => (
        <StatCard
          key={item.key}
          icon={item.icon}
          value={stats[item.key] ?? 0}
          label={item.label}
          onViewAll={() =>
            console.log(`View all ${item.label}`)
          }
        />
      ))}
    </div>
  );
}

export default StatsGrid;