import { X, MapPin, Phone, BedDouble, Users } from "lucide-react";

const HostelDetailsModal = ({ hostel, onClose }) => {
  if (!hostel) return null;

  const totalAvailableBeds = hostel.roomTypes?.reduce(
    (sum, rt) => sum + (rt.availableBeds || 0),
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {hostel.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cover Images */}
          {hostel.images?.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {hostel.images.map((img, i) => (
                <img
                key={i}
                src={img.url}
                alt={`hostel-${i}`}
                className="w-full h-28 object-cover rounded-lg"
                />
                ))}
                </div>
                ) : (
                <div className="h-28 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                  No images uploaded
                  </div>
                )}

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2 text-gray-700">
              <MapPin size={16} className="mt-0.5 text-orange-500" />
              <span>
                {hostel.address}, {hostel.city}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={16} className="text-orange-500" />
              {hostel.contactNumber}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <BedDouble size={16} className="text-orange-500" />
              Total Beds: {hostel.totalBeds}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users size={16} className="text-orange-500" />
              Available: {totalAvailableBeds}
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
              {hostel.genderPreference}
            </span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full ${
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
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Description
              </h3>
              <p className="text-sm text-gray-700">{hostel.description}</p>
            </div>
          )}

          {/* Room Types */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Room Types
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 text-gray-600 font-medium">
                      Type
                    </th>
                    <th className="text-left px-3 py-2 text-gray-600 font-medium">
                      Price
                    </th>
                    <th className="text-left px-3 py-2 text-gray-600 font-medium">
                      Beds
                    </th>
                    <th className="text-left px-3 py-2 text-gray-600 font-medium">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hostel.roomTypes?.map((rt, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-gray-700">{rt.type}</td>
                      <td className="px-3 py-2 text-gray-700">
                        Rs. {rt.price}
                      </td>
                      <td className="px-3 py-2 text-gray-700">
                        {rt.availableBeds}
                      </td>
                      <td className="px-3 py-2">
                        {rt.image ? (
                          <img
                          src={rt.image.url}
                          alt={rt.type}
                          className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                        <span className="text-gray-400 text-xs">—</span>
                        )}
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Amenities */}
          {hostel.amenities?.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {hostel.amenities.map((a) => (
                  <span
                    key={a}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelDetailsModal;