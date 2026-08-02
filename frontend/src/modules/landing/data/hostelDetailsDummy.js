// Dummy data for HostelDetails page.
//
// Fields marked "SCHEMA" exist in backend/src/modules/ownerDashboard/models/hostel.model.js
// and will come from the real API response (res.data.data) once wired up —
// keep these field names exact.
//
// Fields marked "FALLBACK" do NOT exist in the backend schema yet.
// They're hardcoded here so the UI is complete. Remove the hardcoded value
// and read from `hostel.<field>` once the backend adds support.

export const hostelDetailsDummy = {
  _id: "hst_001",

  // ---- SCHEMA fields ----
  name: "Urban Nest Hostel",
  description:
    "Urban Nest Hostel offers a comfortable and vibrant living experience for students. Located in the heart of Koramangala, close to top colleges, cafes, and public transport. The hostel has modern amenities, spacious rooms, and a friendly community to help you feel at home.",
  address: "123, 5th Cross, Koramangala",
  city: "Bangalore",
  genderPreference: "Boys", // "Boys" | "Girls" | "Co-ed"
  totalBeds: 120,
  images: [
    { url: "/images/hostel/room-1.jpg", publicId: "room-1" },
    { url: "/images/hostel/room-2.jpg", publicId: "room-2" },
    { url: "/images/hostel/room-3.jpg", publicId: "room-3" },
    { url: "/images/hostel/room-4.jpg", publicId: "room-4" },
    { url: "/images/hostel/room-5.jpg", publicId: "room-5" },
  ],
  amenities: [
    "WiFi",
    "Food",
    "Laundry",
    "Parking",
    "AC",
    "Security",
    "Power Backup",
    "Hot Water",
  ],
  roomTypes: [
    {
      type: "Single",
      price: 11500,
      availableBeds: 2,
      image: null,
    },
    {
      type: "Double",
      price: 7500,
      availableBeds: 5,
      image: null,
    },
    {
      type: "Triple",
      price: 5000,
      availableBeds: 3,
      image: null,
    },
  ],
  owner: {
    _id: "own_001",
    name: "Arjun Mehta",
    // FALLBACK — User model may not have these yet
    avatarUrl: "/images/owner/arjun-mehta.jpg",
    verified: true,
    responseTime: "Usually responds within 1 hour",
  },

  // ---- FALLBACK fields (not in schema) ----
  verified: true,
  rating: 4.6,
  reviewsCount: 128,
  locationArea: "Koramangala",
  nearestLandmark: { name: "Christ University", distance: "1.2 km" },
  moveInStatus: "Ready to Move",
  totalPhotosCount: 32,
  houseRules: [
    "Entry by 9:30 PM (Curfew Time)",
    "Visitors allowed only in common area",
    "No Smoking / Alcohol",
    "ID proof is mandatory",
    "Mess Timings: 8 AM – 10 AM, 8 PM – 10 PM",
    "Maintain cleanliness and silence",
  ],
  nearby: [
    { name: "Christ University", distance: "1.2 km" },
    { name: "Koramangala Bus Stop", distance: "600 m" },
    { name: "Forum Mall", distance: "1.5 km" },
    { name: "DMart Koramangala", distance: "800 m" },
    { name: "HDFC Bank ATM", distance: "500 m" },
  ],
  reviews: [
    {
      id: "rev_1",
      rating: 5.0,
      comment:
        "Amazing place to live! The facilities are top-notch and the environment is very friendly.",
      studentName: "Ayesha Khan",
      studentInstitute: "Christ University",
      avatarUrl: "/images/reviews/ayesha.jpg",
    },
    {
      id: "rev_2",
      rating: 4.5,
      comment:
        "Great hostel with good food and clean rooms. WiFi is fast and the management is very supportive.",
      studentName: "Rohit Sharma",
      studentInstitute: "RV College of Engineering",
      avatarUrl: "/images/reviews/rohit.jpg",
    },
    {
      id: "rev_3",
      rating: 4.0,
      comment:
        "Overall a wonderful experience. The location is perfect and the staff is cooperative.",
      studentName: "Neha Reddy",
      studentInstitute: "Jain University",
      avatarUrl: "/images/reviews/neha.jpg",
    },
  ],
};
