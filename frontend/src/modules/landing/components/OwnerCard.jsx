import { MessageCircle, BadgeCheck } from "lucide-react";

const OwnerCard = ({ owner }) => {
  if (!owner) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Property Owner
      </h3>

      <div className="flex items-center gap-4">
        <img
          src={
            owner.profileImage?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              owner.name || "Owner"
            )}`
          }
          alt={owner.name}
          className="w-16 h-16 rounded-full object-cover border"
        />

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900">
              {owner.name}
            </h4>

            {owner.isVerified && (
              <BadgeCheck size={18} className="text-blue-500" />
            )}
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Verified Property Owner
          </p>
        </div>
      </div>

      <button
        onClick={() => alert("Chat feature coming soon")}
        className="mt-5 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition"
      >
        <MessageCircle size={18} />
        Chat Now
      </button>
    </div>
  );
};

export default OwnerCard;