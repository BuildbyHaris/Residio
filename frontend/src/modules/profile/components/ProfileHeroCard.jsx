import { Pencil, RefreshCw, Mail, Phone, Calendar } from "lucide-react";
import AvatarUpload from "./AvatarUpload";
import AccountBadge from "./AccountBadge";
import VerifiedChip from "./VerifiedChip";

function ProfileHeroCard({ user, onEditProfile, onSwitchToSeller }) {
  return (
    <div className="relative bg-[#FDEDE3] rounded-2xl p-8 overflow-hidden">
      {/* Decorative squiggle */}
      <svg
        className="absolute top-0 right-0 w-64 h-64 opacity-[0.12] pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="160" cy="40" r="120" stroke="#F5732C" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
        <circle cx="160" cy="40" r="80" stroke="#F5732C" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      </svg>

      <div className="relative flex flex-col lg:flex-row gap-8">
        {/* Left: Avatar */}
        <AvatarUpload
          avatarUrl={user.avatarUrl}
          name={user.name}
          onChangePhoto={() => console.log("Change photo")}
        />

        {/* Middle: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <AccountBadge type={user.accountType} />
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center gap-2.5 text-gray-600 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-600 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-600 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Member since {user.memberSince}</span>
              {user.verified && (
                <span className="ml-2">
                  <VerifiedChip />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col items-end gap-4 flex-shrink-0">
          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>

          {user.accountType === "buyer" && (
            <div className="flex flex-col items-end gap-2 mt-2">
              <button
                onClick={onSwitchToSeller}
                className="flex items-center gap-2.5 border-2 border-[#F5732C] text-[#F5732C] bg-white rounded-xl px-5 py-3 font-semibold text-sm hover:bg-[#FDEDE3] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Switch to Seller Account
              </button>
              <p className="text-gray-500 text-sm text-right">
                List your property and start earning
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeroCard;