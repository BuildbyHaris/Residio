import { Mail, Phone, CalendarDays, CheckCircle2, Camera, Pencil, Plus } from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";

const OwnerProfileHeader = ({ onAddProperty }) => {
  const { user } = useAuth();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="bg-orange-50/60 rounded-2xl p-6 flex items-start justify-between gap-6 relative overflow-hidden">
      {/* Left: Avatar + Info */}
      <div className="flex items-start gap-5 z-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-orange-300 bg-orange-100 flex items-center justify-center text-orange-600 text-2xl font-bold overflow-hidden">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.charAt(0).toUpperCase() || "O"
            )}
          </div>
          <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow border border-gray-200">
            <Camera size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              Owner Account
            </span>
          </div>

          <div className="space-y-1.5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail size={15} />
              {user?.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={15} />
              {user?.phone}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2">
                <CalendarDays size={15} />
                Member since {memberSince}
              </span>
              {user?.isVerified && (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle2 size={15} />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-col items-end gap-3 z-10">
        <button className="flex items-center gap-1.5 border border-gray-300 bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50">
          <Pencil size={15} />
          Edit Profile
        </button>

        <div className="text-right">
          <button
            onClick={onAddProperty}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={18} />
            Add New Property
          </button>
          <p className="text-xs text-gray-500 mt-1">
            List a new hostel, PG or apartment
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfileHeader;