const IconChip = ({ icon: Icon, label, size = "lg" }) => {
  const sizeClasses = size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const iconSize = size === "lg" ? 28 : 20;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses} rounded-full bg-brand-peachLight flex items-center justify-center`}
      >
        <Icon
          size={iconSize}
          className="text-brand-orange"
        />
      </div>

      <span className="text-sm text-center text-ink-700 font-medium">
        {label}
      </span>
    </div>
  );
};

export default IconChip;