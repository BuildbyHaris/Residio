import {
  Wifi,
  Utensils,
  Shirt,
  ParkingCircle,
  Wind,
  ShieldCheck,
  Zap,
  Droplet,
} from "lucide-react";
import IconChip from "./IconChip";

// Maps the fixed enum values from the Hostel schema's `amenities` field
// to an icon + display label. If backend adds new enum values later,
// add an entry here.
const AMENITY_MAP = {
  WiFi: { icon: Wifi, label: "WiFi" },
  Food: { icon: Utensils, label: "Food / Mess" },
  Laundry: { icon: Shirt, label: "Laundry" },
  Parking: { icon: ParkingCircle, label: "Parking" },
  AC: { icon: Wind, label: "AC" },
  Security: { icon: ShieldCheck, label: "24/7 Security" },
  "Power Backup": { icon: Zap, label: "Power Backup" },
  "Hot Water": { icon: Droplet, label: "Hot Water" },
};

const AmenitiesSection = ({ amenities = [] }) => {
  if (amenities.length === 0) {
  return (
    <div className="bg-white rounded-xl2 border border-border-light p-6">
      <h2 className="text-xl font-semibold text-ink-900 mb-3">
        Amenities
      </h2>

      <p className="text-sm text-ink-500">
        Amenities information is not available.
      </p>
    </div>
  );
}

  return (
    <div className="bg-white rounded-xl2 border border-border-light p-6">
      <h2 className="text-xl font-semibold text-ink-900 mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {[...amenities].sort().map((key) => {
          const entry = AMENITY_MAP[key];
          if (!entry) return null; // Skip unknown amenities
          return <IconChip key={key} icon={entry.icon} label={entry.label} />;
        })}
      </div>
    </div>
  );
};

export default AmenitiesSection;
