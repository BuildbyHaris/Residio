import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

const HostelCard = ({ hostel }) => {
  const { _id, name, city, address, images, minPrice, rating, reviewCount, isVerified } = hostel;
  const coverImage = images?.[0]?.url || null;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        {coverImage ? (
          <img src={coverImage} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
        {isVerified && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            ✅ Verified
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="flex items-center text-gray-600 text-sm mt-1">
          <MapPin size={14} className="mr-1" />
          {city}, {address}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 font-semibold">{rating?.toFixed(1) || "N/A"}</span>
          </div>
          {reviewCount && (
            <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
          )}
        </div>
        <p className="text-blue-600 font-bold mt-2">Starting from ₹{minPrice || 0}/mo</p>
        <Link
          to={`/hostel/${_id}`}
          className="mt-3 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

// ✅ Only ONE default export – memoized version at the end
export default React.memo(HostelCard);