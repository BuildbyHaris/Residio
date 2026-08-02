import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { getAllActiveHostelsApi } from "../api/hostel.api";
import { mapHostelToStayCard } from "../utils/mapHostelToStayCard";
import StayCard from "./StayCard";

function PopularStays() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await getAllActiveHostelsApi();
        const mapped = res.data.data.map(mapHostelToStayCard);
        setStays(mapped);
      } catch (error) {
        console.error("Failed to load hostels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-ink-900">
          Popular Stays Near You
        </h2>
        <a
          href="#view-all"
          className="text-brand-orange font-medium text-sm flex items-center gap-1 hover:text-brand-orangeDark transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {loading ? (
        <p className="text-ink-500 text-sm">Loading hostels...</p>
      ) : stays.length === 0 ? (
        <p className="text-ink-500 text-sm">
          No hostels available right now. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stays.map(function (stay) {
            return (
              <StayCard
                key={stay.id}
                id={stay.id}
                image={stay.image}
                title={stay.title}
                location={stay.location}
                amenities={stay.amenities}
                rating={stay.rating}
                reviewCount={stay.reviewCount}
                priceLabel={stay.priceLabel}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default PopularStays;
