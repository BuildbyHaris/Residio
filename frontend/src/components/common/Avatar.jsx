import { useState } from "react";
import { getInitials } from "../../modules/profile/utils/imageHelpers";

function Avatar({
  user,
  size = "h-10 w-10",
  textSize = "text-sm",
}) {
  const [imageError, setImageError] =
    useState(false);

  const imageUrl =
    user?.profileImage?.url;

  if (imageUrl && !imageError) {
    return (
      <img
        src={imageUrl}
        alt={user?.name}
        onError={() => setImageError(true)}
        className={`${size} rounded-full border border-orange-200 object-cover`}
      />
    );
  }

  return (
    <div
      className={`${size} flex items-center justify-center rounded-full bg-[#F5732C] font-semibold text-white ${textSize}`}
    >
      {getInitials(user?.name)}
    </div>
  );
}

export default Avatar;