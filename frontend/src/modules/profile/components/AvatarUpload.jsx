import { Camera } from "lucide-react";
import { getInitials } from "../utils/imageHelpers";

function AvatarUpload({ imageUrl, name, onChangePhoto }) {
  return (
    <div className="relative inline-block flex-shrink-0">
      <div className="w-32 h-32 rounded-full border-4 border-[#F5732C] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#FDEDE3] text-[#F5732C] text-3xl font-bold">
            {getInitials(name)}
          </div>
        )}
      </div>
      <button
        onClick={onChangePhoto}
        className="absolute bottom-1 right-1 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Change photo"
      >
        <Camera className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}

export default AvatarUpload;