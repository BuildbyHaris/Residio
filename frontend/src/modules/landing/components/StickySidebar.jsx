import { useState } from "react";
import {
  ShieldCheck,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Button from "./Button";

const StickySidebar = ({
  hostel,
  currentUser,
  selectedRoomType,
  setSelectedRoomType,
}) => {
  const [moveInDate, setMoveInDate] = useState("");

  const startingPrice =
    hostel.roomTypes?.length > 0
      ? Math.min(...hostel.roomTypes.map((room) => room.price))
      : 0;
  const selectedRoom = hostel.roomTypes?.find(
    (room) => room.type === selectedRoomType
  );
  // Business rule: an owner viewing their own listing should not be able
  // to chat/book on it. Everyone else (guest, buyer, or owner viewing a
  // listing that isn't theirs) can.
  const isOwnListing =
    currentUser?.role === "owner" && currentUser?._id === hostel.owner?._id;

  const handleChatNow = () => {
    // TODO: wire up to chat module once it exists
    console.log("Chat Now clicked", {
      hostelId: hostel._id,
      selectedRoomType,
      moveInDate,
    });
  };

  return (
    <div className="space-y-6">
      {/* Price + booking card */}
      <div className="sticky top-24 bg-white rounded-xl2 shadow-lg border border-border-light p-6">
        <p className="text-sm text-ink-500">Starting from</p>
        <h2 className="text-4xl font-bold text-brand-orange mt-1">
          Rs.{startingPrice.toLocaleString()}
          <span className="text-base font-medium text-ink-500">/mo</span>
        </h2>

        <div className="mt-6">
          <label className="text-sm font-semibold text-ink-900 block mb-2">
            Move-in Date
          </label>
          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
            />
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl2 border border-border-light text-ink-700 focus:outline-none focus:border-brand-orange"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-ink-900 block mb-2">
            Room Type
          </label>
          <select
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl2 border border-border-light text-ink-700 focus:outline-none focus:border-brand-orange"
          >
            <option value="">Select room type</option>
            {hostel.roomTypes?.map((room) => (
              <option
                key={room.type}
                value={room.type}
                disabled={room.availableBeds === 0}
              >
                {room.type} — Rs. {room.price.toLocaleString()}/mo
                {room.availableBeds === 0 ? " (Full)" : ""}
              </option>
            ))}
          </select>
          {selectedRoom && (
            <p className="mt-2 text-xs text-ink-500">
              {selectedRoom.availableBeds} bed
              {selectedRoom.availableBeds > 1 ? "s" : ""} available
            </p>
          )}
        </div>

        {!isOwnListing ? (
          <Button
            variant="primary"
            className="w-full mt-6 py-3"
            disabled={!selectedRoomType || !moveInDate}
            onClick={handleChatNow}
          >
            Chat Now
          </Button>
        ) : (
          <p className="mt-6 text-sm text-ink-500 text-center bg-brand-peachLight rounded-xl2 py-3">
            This is your listing
          </p>
        )}

        <div className="mt-5 space-y-2 text-sm text-ink-600">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span>Secure Booking</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span>No Hidden Charges</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span>Verified Hostel Listing</span>
          </div>
        </div>
      </div>

      {/* Owner card */}
      {hostel.owner && (
        <div className="bg-white rounded-xl2 shadow-sm border border-border-light p-6">
          <p className="text-sm text-ink-500 mb-3">Managed by</p>
          <div className="flex items-center gap-3">
            <img
              src={
                hostel.owner?.profileImage?.url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  hostel.owner?.name || "Owner"
                )}`
              }
              alt={hostel.owner?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-ink-900">{hostel.owner.name}</p>
              {hostel.owner?.isVerified && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-orange bg-brand-peachLight px-2 py-0.5 rounded-full mt-1">
                  <ShieldCheck size={12} />
                  Verified Owner
                </span>
              )}
            </div>
          </div>

          {!isOwnListing && (
            <Button
              variant="primary"
              className="w-full mt-6 py-3"
              disabled={!selectedRoomType || !moveInDate}
              onClick={handleChatNow}
            >
              Chat Now
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default StickySidebar;
