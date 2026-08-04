import { useEffect, useState } from "react";
import { Heart, Image as ImageIcon } from "lucide-react";

const PLACEHOLDER_IMAGE =
  "/images/placeholders/hostel-placeholder.jpg";

const HostelGallery = ({
  images = [],
  hostelName = "",
  verified = false,
  totalPhotosCount = 0,
}) => {
  const galleryImages = images.length > 0 ? images : [PLACEHOLDER_IMAGE];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  useEffect(() => {
    setSelectedImage(galleryImages[0]);
  }, [galleryImages]);

  const thumbnails = galleryImages.slice(1, 5);
  const remainingCount = Math.max(totalPhotosCount - 5, 0);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Main Image */}
      <div className="lg:col-span-3 relative overflow-hidden rounded-xl2">
        <img
          src={selectedImage}
          alt={hostelName}
          onError={(e) => {
            e.target.src = PLACEHOLDER_IMAGE;
          }}
          className="w-full h-[420px] lg:h-[520px] object-cover cursor-pointer"
        />

        {/* Verified badge */}
        {verified && (
          <div className="absolute left-5 top-5 bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            Verified
          </div>
        )}

        {/* Favourite */}
        <button
          type="button"
          aria-label="Add to favourites"
          onClick={() => console.log("Wishlist")}
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <Heart size={20} className="text-ink-900" />
        </button>
      </div>

      {/* Right Thumbnails — 2x2 grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-rows-2">
        {thumbnails.map((image, index) => {
          const isLast = index === 3 && remainingCount > 0;

          return (
            <button
              key={image}
              type="button"
              onClick={() => {
                console.log("Open Gallery");
                setSelectedImage(image);
              }}
              className={`relative overflow-hidden rounded-xl2 border-2 transition-all group
                ${selectedImage === image
                  ? "border-brand-orange"
                  : "border-transparent hover:border-brand-orangeDark"
                }`}
            >
              <img
                src={image}
                alt={`${hostelName} photo ${index + 2}`}
                onError={(e) => {
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
                
                className="w-full h-[120px] lg:h-[122px] object-cover group-hover:scale-105 transition duration-300"
              />

              {isLast && (
                <div className="absolute inset-0 bg-ink-900/70 flex flex-col items-center justify-center text-white text-center">
                  <ImageIcon size={22} />
                  <span className="text-sm font-semibold mt-1 leading-tight">
                    +{remainingCount}
                    <br />
                    View All Photos
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
    
  );
  console.log(hostel.images);
  console.log(images);
};

export default HostelGallery;
