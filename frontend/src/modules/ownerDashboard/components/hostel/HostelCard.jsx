import ThreeDotMenu from "./ThreeDotMenu";

const HostelCard = ({ hostel, onEdit, onDelete }) => {
  const coverImage = hostel.images?.[0]?.url || null;

  const totalAvailableBeds =
    hostel.roomTypes?.reduce((sum, rt) => sum + (rt.availableBeds || 0), 0) ?? 0;

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="h-40 bg-gray-100 flex items-center justify-center">
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

      <div className="p-4 space-y-3">
        {/* Header: Name + 3-dot menu */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 text-base">
              {hostel.name}
            </h3>
            <p className="text-sm text-gray-500">
              {hostel.address}, {hostel.city}
            </p>
          </div>
          <ThreeDotMenu
            onEdit={() => onEdit(hostel)}
            onDelete={() => onDelete(hostel._id)}
          />
        </div>

        {/* Badges: Gender + Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            {hostel.genderPreference}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              hostel.status === "Active"
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {hostel.status}
          </span>
        </div>

        {/* Description */}
        {hostel.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {hostel.description}
          </p>
        )}

        {/* Beds Summary */}
        <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
          <span className="text-gray-600">Total Beds</span>
          <span className="font-medium text-gray-800">{hostel.totalBeds}</span>
        </div>
        <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
          <span className="text-gray-600">Available Beds</span>
          <span className="font-medium text-gray-800">
            {totalAvailableBeds}
          </span>
        </div>

        {/* Room Types Table */}
        {hostel.roomTypes?.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Room Types
            </p>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-1.5 text-gray-600 font-medium">
                      Type
                    </th>
                    <th className="text-left px-3 py-1.5 text-gray-600 font-medium">
                      Price
                    </th>
                    <th className="text-left px-3 py-1.5 text-gray-600 font-medium">
                      Beds
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hostel.roomTypes.map((rt, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="px-3 py-1.5 text-gray-700">{rt.type}</td>
                      <td className="px-3 py-1.5 text-gray-700">
                        Rs. {rt.price}
                      </td>
                      <td className="px-3 py-1.5 text-gray-700">
                        {rt.availableBeds}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Amenities */}
        {hostel.amenities?.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Amenities
            </p>
            <div className="flex flex-wrap gap-1.5">
              {hostel.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Number */}
        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
          <span className="text-gray-500">Contact</span>
          <span className="font-medium text-gray-700">
            {hostel.contactNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;