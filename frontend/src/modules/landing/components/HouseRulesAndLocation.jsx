import { Clock, MapPin } from "lucide-react";

const HouseRulesAndLocation = ({ houseRules = [], nearby = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* House Rules */}
      <div className="bg-white rounded-xl2 border border-border-light p-6">
        <h2 className="text-xl font-semibold text-ink-900 mb-4">
          House Rules
        </h2>

        {houseRules.length > 0 ? (
          <ul className="space-y-3">
            {houseRules.map((rule, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-ink-700"
              >
                <Clock
                  size={16}
                  className="text-brand-orange mt-0.5 shrink-0"
                />
                {rule}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink-500">
            No house rules available.
          </p>
        )}
      </div>

      {/* Location & Nearby */}
      <div
        id="location"
        className="bg-white rounded-xl2 border border-border-light p-6"
      >
        <h2 className="text-xl font-semibold text-ink-900 mb-4">
          Location & Nearby
        </h2>

        <div className="h-40 rounded-xl2 bg-brand-peachLight border border-border-light flex flex-col items-center justify-center mb-4">
          <MapPin size={34} className="text-brand-orange" />

          <p className="mt-3 text-sm font-medium text-ink-600">
            Interactive Map
          </p>

          <p className="text-xs text-ink-500">
            Google Maps integration coming soon
          </p>
        </div>

        {nearby.length > 0 ? (
          <ul className="space-y-3">
            {nearby.map((place, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-ink-700">
                  <MapPin size={14} className="text-ink-500" />
                  {place.name}
                </span>

                <span className="text-ink-500">
                  {place.distance}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink-500">
            Nearby places not available.
          </p>
        )}

        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:underline"
        >
          View on Map →
        </button>
      </div>

    </div>
  );
};

export default HouseRulesAndLocation;