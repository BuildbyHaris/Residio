// src/modules/findHostel/components/FindHostelCard.jsx

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import {
  MapPin,
  Heart,
  ShieldCheck,
  Star,
  Wifi,
  Utensils,
  ParkingCircle,
  Snowflake,
  Zap,
  Shield,
  MessageCircle,
} from "lucide-react";

import {
  createOrGetPropertyConversation,
} from "../../chat/services/chat.service";

const AMENITY_ICON = {
  wifi: Wifi,
  food: Utensils,
  parking: ParkingCircle,
  ac: Snowflake,
  power_backup: Zap,
  security: Shield,
};

const FindHostelCard = ({
  hostel,
}) => {
  const [fav, setFav] =
    useState(false);

  const navigate =
    useNavigate();

  const {
    _id,
    id,
    name,
    city,
    location,
    address,
    image,
    images,
    isVerified,
    verified,
    amenities = [],
    rating = 0,
    reviewCount = 0,
    price,
    startingPrice,
  } = hostel || {};

  const hostelId =
    _id || id;

  const cover =
    image ||
    images?.[0] ||
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600";

  const isVerifiedFlag =
    isVerified || verified;

  const displayPrice =
    startingPrice ||
    price ||
    0;

  const displayLocation =
    [
      location,
      city,
    ]
      .filter(Boolean)
      .join(", ") ||
    address ||
    "—";

  const cardAmenities =
    amenities.slice(0, 4);

  /**
   * =========================================================
   * CHAT WITH OWNER
   * =========================================================
   */
  const handleChatWithOwner =
  async () => {
    try {
      if (!hostelId) {
        console.error(
          "Hostel ID is missing"
        );

        return;
      }

      const response =
        await createOrGetPropertyConversation(
          hostelId
        );

      const conversation =
        response?.data
          ?.conversation;

      if (!conversation?._id) {
        console.error(
          "Conversation ID not found",
          response
        );

        return;
      }

      navigate(
        `/chat/${conversation._id}`
      );
    } catch (error) {
      console.error(
        "Failed to open chat:",
        error
      );
    }
  };

  return (
    <div className="bg-white border border-[#EDEDED] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      {/* =====================================================
          IMAGE
      ====================================================== */}
      <div className="relative">
        <img
          src={cover}
          alt={name}
          className="w-full h-[170px] object-cover"
        />

        {isVerifiedFlag && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-[#F5732C] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />

            Verified
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();

            setFav(!fav);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center hover:scale-105 transition"
        >
          <Heart
            className={`w-4 h-4 ${
              fav
                ? "fill-[#F5732C] text-[#F5732C]"
                : "text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* =====================================================
          CARD CONTENT
      ====================================================== */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-[#1B2333] truncate">
          {name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          <MapPin className="w-3.5 h-3.5" />

          <span className="truncate">
            {displayLocation}
          </span>
        </div>

        {/* ===================================================
            AMENITIES
        ==================================================== */}
        {cardAmenities.length >
          0 && (
          <div className="flex items-center gap-3 mt-3 text-gray-500">
            {cardAmenities.map(
              (a) => {
                const key =
                  typeof a ===
                  "string"
                    ? a
                    : a.value;

                const Icon =
                  AMENITY_ICON[
                    key
                  ] || Wifi;

                return (
                  <Icon
                    key={key}
                    className="w-4 h-4"
                  />
                );
              }
            )}
          </div>
        )}

        {/* ===================================================
            RATING
        ==================================================== */}
        <div className="flex items-center gap-2 mt-3 text-sm">
          <span className="font-semibold text-[#1B2333]">
            {Number(
              rating
            ).toFixed(1)}
          </span>

          <div className="flex">
            {[1, 2, 3, 4, 5].map(
              (i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i <=
                    Math.round(
                      rating
                    )
                      ? "fill-[#F5732C] text-[#F5732C]"
                      : "text-gray-300"
                  }`}
                />
              )
            )}
          </div>

          <span className="text-xs text-gray-500">
            ({reviewCount})
          </span>
        </div>

        {/* ===================================================
            PRICE + ACTIONS
        ==================================================== */}
        <div className="flex items-end justify-between gap-3 mt-4 pt-3 border-t border-[#F3F3F3]">
          <div>
            <div className="text-[11px] text-gray-500">
              Starting from
            </div>

            <div className="text-base font-bold text-[#1B2333]">
              ₹
              {Number(
                displayPrice
              ).toLocaleString()}

              <span className="text-xs font-normal text-gray-500">
                /mo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* CHAT BUTTON */}
            <button
              type="button"
              onClick={
                handleChatWithOwner
              }
              className="inline-flex items-center gap-1.5 border border-[#F5732C] text-[#F5732C] hover:bg-[#FFF3ED] text-xs font-semibold px-3 py-2 rounded-lg transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />

              Chat
            </button>

            {/* VIEW DETAILS */}
            <Link
              to={`/hostel/${hostelId}`}
              className="bg-[#F5732C] hover:bg-[#E5631D] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHostelCard;