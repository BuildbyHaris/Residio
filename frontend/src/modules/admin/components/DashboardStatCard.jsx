import React from 'react';

const DashboardStatCard = ({
  icon: Icon,
  iconBgColor = 'bg-orange-50',
  iconColor = 'text-[#ec6a52]',
  title,
  value,
  description,
  trend,
  trendDirection,
  trendLabel,
}) => {
  const getTrendColor = () => {
    if (trendDirection === 'up') {
      return 'text-green-600';
    }

    if (trendDirection === 'down') {
      return 'text-red-500';
    }

    return 'text-gray-500';
  };

  const getTrendIcon = () => {
    if (trendDirection === 'up') {
      return (
        <svg
          className="w-3 h-3 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V9.414l-4.293 4.293a1 1 0 01-1.414 0L8 11.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 11.586 14.586 8H13a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (trendDirection === 'down') {
      return (
        <svg
          className="w-3 h-3 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 13a1 1 0 011 1h4a1 1 0 01-1 1h-4a1 1 0 010-2zm0 0V9.414l-4.293 4.293a1 1 0 01-1.414 0L2 9.414l4.293-4.293a1 1 0 011.414 0L11 8.586 14.586 5H13a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-4.293 4.293a1 1 0 01-1.414 0L8 8.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 8.586z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return null;
  };

  return (
    <div
      className="
        w-full
        min-w-0
        h-[108px]
        bg-white
        border
        border-gray-100
        rounded-xl
        shadow-sm
        hover:shadow-md
        transition-shadow
        duration-200
        px-3
        py-3
      "
    >
      <div className="flex items-center gap-3 h-full">

        {/* Icon */}
        <div
          className={`
            ${iconBgColor}
            w-11
            h-11
            rounded-xl
            flex
            items-center
            justify-center
            flex-shrink-0
          `}
        >
          {Icon && (
            <Icon
              className={`w-[21px] h-[21px] ${iconColor}`}
              strokeWidth={1.8}
            />
          )}
        </div>

        {/* Content */}
        <div
          className="
            flex-1
            min-w-0
            flex
            flex-col
            justify-center
          "
        >
          {/* Title */}
          <p
            className="
              text-[11px]
              font-medium
              text-gray-500
              uppercase
              tracking-wide
              leading-4
              line-clamp-2
            "
          >
            {title || '—'}
          </p>

          {/* Value */}
          <p
            className="
              text-[22px]
              font-bold
              text-[#1e293b]
              leading-6
              mt-0.5
            "
          >
            {value !== null && value !== undefined
              ? Number(value).toLocaleString()
              : '—'}
          </p>

          {/* Description */}
          {description && (
            <p
              className="
                text-[11px]
                text-gray-400
                leading-4
                mt-0.5
                line-clamp-2
              "
            >
              {description}
            </p>
          )}

          {/* Trend */}
          {trend && (
            <div
              className={`
                flex
                items-center
                gap-1
                mt-1
                ${getTrendColor()}
              `}
            >
              {getTrendIcon()}

              <span className="text-[11px] font-medium">
                {trend}
              </span>

              {trendLabel && (
                <span className="text-[11px] text-gray-400">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;