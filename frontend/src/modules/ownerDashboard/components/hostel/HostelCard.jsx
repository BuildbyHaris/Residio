import ThreeDotMenu from "./ThreeDotMenu";

const HostelCard = ({ hostel, onEdit, onDelete }) => {
  const coverImage = hostel.images?.[0] || null;
  const minPrice = hostel.roomTypes?.length
    ? Math.min(...hostel.roomTypes.map((rt) => rt.price))
    : null;

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="h-36 bg-gray-100 flex items-center justify-center">
        {coverImage ? (
          <img
            src={coverImage}
            alt={hostel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-800">{hostel.name}</h3>
            <p className="text-sm text-gray-500">{hostel.city}</p>
          </div>
          <ThreeDotMenu
            onEdit={() => onEdit(hostel)}
            onDelete={() => onDelete(hostel._id)}
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            {hostel.genderPreference}
          </span>
          {minPrice !== null && (
            <span className="text-sm font-medium text-gray-700">
              from Rs. {minPrice}
            </span>
          )}
        </div>

        <span
          className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
            hostel.status === "Active"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {hostel.status}
        </span>
      </div>
    </div>
  );
};

export default HostelCard;