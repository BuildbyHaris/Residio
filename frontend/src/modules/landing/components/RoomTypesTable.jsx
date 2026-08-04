import Button from "./Button";

// Room `type` enum from schema doesn't include a bed/bathroom description,
// so we derive a friendly description string here. FALLBACK — remove once
// backend adds a real description field if needed.
const ROOM_TYPE_DESCRIPTION = {
  Single: "1 Bed • Attached Bathroom",
  Double: "2 Beds • Attached Bathroom",
  Triple: "3 Beds • Attached Bathroom",
  Dormitory: "Shared Dormitory • Common Bathroom",
};

const RoomTypesTable = ({
  roomTypes = [],
  onSelect,
  selectedRoomType,
}) => {
  if (roomTypes.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink-900 mb-4">
        Room Types & Pricing
      </h2>

      <div className="bg-white rounded-xl2 border border-border-light overflow-hidden">
        {/* Header row - desktop only */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-sm text-ink-500 border-b border-border-light">
          <div className="col-span-3">Room Type</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-2">Price / Month</div>
          <div className="col-span-2">Availability</div>
          <div className="col-span-2"></div>
        </div>

        {roomTypes.map((room, index) => (
          <div
            key={`${room.type}-${index}`}
            className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 border-b border-border-light last:border-b-0 items-center transition-all
              ${selectedRoomType === room.type
                ? "bg-brand-peachLight border-l-4 border-l-brand-orange"
                : "hover:bg-gray-50"
              }`}
          >
            <div className="sm:col-span-3 flex items-center gap-4">
              <img
                src={
                  room.image?.url ||
                  "https://placehold.co/400x300/FDF2E9/F97316?text=Room"
                }
                alt={room.type}
                className="w-20 h-16 rounded-lg object-cover border border-border-light"
              />

              <div>
                <h3 className="font-semibold text-ink-900">
                  {room.type} Room
                </h3>

                <p className="text-xs text-ink-500 mt-1">
                  Ideal for students
                </p>
              </div>
            </div>
            <div className="sm:col-span-3 text-sm text-ink-500">
              {ROOM_TYPE_DESCRIPTION[room.type] ||
               "Comfortable room with essential amenities."}
            </div>
            <div className="sm:col-span-2 font-semibold text-ink-900">
              Rs. {room.price.toLocaleString()}
            </div>
            <div className="sm:col-span-2">
              {room.availableBeds === 0 ? (
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  Full
                </span>
              ) : room.availableBeds <= 3 ? (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  Only {room.availableBeds} Left
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {room.availableBeds} Beds Available
                </span>
              )}
            </div>
            <div className="sm:col-span-2">
              <Button
                variant={
                  selectedRoomType === room.type ? "primary" : "outline"
                }
                className="w-full sm:w-auto whitespace-nowrap"
                disabled={room.availableBeds === 0}
                onClick={() => onSelect?.(room)}
              >
                {selectedRoomType === room.type ? "Selected ✓" : "Select"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomTypesTable;