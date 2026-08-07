import { Star } from "lucide-react";

const StarRating = ({
  value = 0,
  onChange,
  size = 18,
  readonly = false,
}) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`${
            readonly
              ? "cursor-default"
              : "cursor-pointer hover:scale-110"
          } transition`}
        >
          <Star
            size={size}
            className={
              star <= value
                ? "fill-[#F5732C] text-[#F5732C]"
                : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;