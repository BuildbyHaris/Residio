export const mapHostelToStayCard = (hostel) => {
  const minPrice = hostel.roomTypes?.length
    ? Math.min(...hostel.roomTypes.map((rt) => rt.price))
    : null;

  return {
    id: hostel._id,
    image: hostel.images?.[0]?.url || "https://via.placeholder.com/600x450",
    title: hostel.name,
    location: `${hostel.address}, ${hostel.city}`,
    amenities: (hostel.amenities || [])
      .map((a) => a.toLowerCase().replace(/\s/g, ""))
      .slice(0, 4),
    rating: 0,
    reviewCount: 0,
    priceLabel: minPrice ? `Rs. ${minPrice}/mo` : "Price on request",
  };
};