import {
  MapPin,
  Heart,
  Share2,
  Bed,
  LayoutGrid,
  Wallet,
  User,
} from "lucide-react";
import Badge from "./Badge";
import RatingStars from "./RatingStars";
import StatItem from "./StatItem";

const HostelInfo = ({ hostel }) => {
  const roomTypesCount = hostel.roomTypes?.length || 0;

  const startingPrice =
    hostel.roomTypes?.length > 0
      ? Math.min(...hostel.roomTypes.map((room) => room.price))
      : null;

  return (
    <div>
      {/* Title row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink-900">{hostel.name}</h1>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <RatingStars rating={hostel.rating || 0} />

            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-ink-900">
                {hostel.rating?.toFixed(1) || "New"}
              </span>

              <span className="text-ink-500">
                ({hostel.reviewsCount || 0} Reviews)
              </span>
            </div>
            <Badge>{hostel.genderPreference} Hostel</Badge>
            {hostel.verified && (
              <Badge variant="success">Verified</Badge>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2 text-ink-500">
            <MapPin size={18} />
            <span>
              {hostel.address}, {hostel.city}
            </span>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("location")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-brand-orange text-sm font-semibold hover:underline ml-1"
            >
              View on Map
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Add to favourites"
            onClick={() => console.log("Wishlist")}
            className="w-11 h-11 rounded-full bg-white border border-border-light flex items-center justify-center shadow-sm hover:scale-105 transition"
          >
            <Heart size={20} className="text-ink-900" />
          </button>
          <button
            type="button"
            aria-label="Share"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: hostel.name,
                  text: hostel.description,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }
            }}
            className="w-11 h-11 rounded-full bg-white border border-border-light flex items-center justify-center shadow-sm hover:scale-105 transition"
          >
            <Share2 size={20} className="text-ink-900" />
          </button>
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 bg-brand-peachLight rounded-xl2 p-5">
        <StatItem
          icon={Bed}
          value={hostel.totalBeds}
          label="Total Beds"
        />
        <StatItem
          icon={LayoutGrid}
          value={roomTypesCount}
          label="Room Types"
        />
        <StatItem
          icon={Wallet}
          value={
            startingPrice
              ? `Rs. ${startingPrice.toLocaleString()}`
              : "N/A"
          }
          label="Starting From"
        />

        <StatItem
          icon={User}
          value={hostel.owner?.name || "Unknown Owner"}
          label="Owner"
        />
      </div>
    </div>
  );
};

export default HostelInfo;
