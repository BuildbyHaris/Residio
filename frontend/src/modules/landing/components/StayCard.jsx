import React from 'react';
import { MapPin, Wifi, Bike, Utensils, AirVent, Heart, Shield, Zap, Droplet, Car } from 'lucide-react';
import Badge from './Badge';
import RatingStars from './RatingStars';
import Button from './Button';

var amenityIconMap = {
  wifi: Wifi,
  food: Utensils,
  laundry: Droplet,
  parking: Car,
  ac: AirVent,
  security: Shield,
  powerbackup: Zap,
  hotwater: Droplet,
  bike: Bike,
};

function StayCard({ image, title, location, amenities, rating, reviewCount, priceLabel }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-border-light overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge />
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-brand-peachLight transition-colors cursor-pointer">
          <Heart className="w-4 h-4 text-ink-500" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-ink-900 text-sm">{title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5 text-ink-500" />
          <span className="text-ink-500 text-xs">{location}</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3 mt-3">
          {amenities.map(function (amenity) {
            var IconComponent = amenityIconMap[amenity] || Wifi;
            return (
              <IconComponent key={amenity} className="w-4 h-4 text-ink-500" />
            );
          })}
        </div>

        {/* Rating */}
        <div className="mt-3">
          <RatingStars rating={rating} reviewCount={reviewCount} />
        </div>

        {/* Price */}
        <p className="mt-2 text-xs text-ink-500">
          Starting from <span className="font-bold text-ink-900 text-sm">{priceLabel}</span>
        </p>

        {/* Book Button */}
        <Button variant="primary" className="w-full mt-3 text-sm py-2">
          Call Now
        </Button>
      </div>
    </div>
  );
}

export default StayCard;