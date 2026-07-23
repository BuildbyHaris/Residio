import { Eye, Pencil, Trash2 } from "lucide-react";

const HostelTable = ({ hostels, onView, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Property
            </th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Type
            </th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Price
            </th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Status
            </th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Beds Available
            </th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Actions
            </th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Visibility
            </th>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel) => {
            const minPrice = hostel.roomTypes?.length
              ? Math.min(...hostel.roomTypes.map((rt) => rt.price))
              : "-";
            const availableBeds = hostel.roomTypes?.reduce(
              (sum, rt) => sum + (rt.availableBeds || 0),
              0
            );

            return (
              <tr
                key={hostel._id}
                className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer"
                onClick={() => onView(hostel)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                    src={hostel.images?.[0]?.url || "https://via.placeholder.com/48"}
                    alt={hostel.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {hostel.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {hostel.city}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">Hostel</td>
                <td className="px-4 py-3 text-gray-700">Rs. {minPrice}/mo</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      hostel.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {hostel.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{availableBeds}</td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onView(hostel)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <Eye size={17} />
                    </button>
                    <button
                      onClick={() => onEdit(hostel)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(hostel._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStatus(hostel);
                    }}
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      hostel.status === "Active"
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        hostel.status === "Active" ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HostelTable;