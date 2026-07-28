import React from "react";
import { Link } from "react-router-dom";

const HostelCard = ({ hostel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-gray-200">
        {hostel.images?.[0] ? (
          <img src={hostel.images[0]} alt={hostel.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{hostel.name}</h3>
        <p className="text-gray-600">{hostel.city}</p>
        <p className="text-blue-600 font-bold mt-1">₹{hostel.minPrice || 0}/month</p>
        <Link
          to={`/hostel/${hostel._id}`}
          className="mt-3 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

// ✅ Only ONE default export – memoized version at the end
export default React.memo(HostelCard);