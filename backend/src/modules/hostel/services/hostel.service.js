import Hostel from "../../ownerDashboard/models/hostel.model.js";
import { SORT_OPTIONS, DEFAULT_LIMIT } from "../constants/hostel.constants.js";

export const searchHostels = async (query) => {
  // Build filter
  const filter = { status: "Active" };

  // Text search
  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.$or = [
      { name: regex },
      { city: regex },
      { address: regex },
    ];
  }

  // Gender
  if (query.gender) {
    filter.genderPreference = query.gender;
  }

  // Room type
  if (query.roomType) {
    filter["roomTypes.type"] = query.roomType;
  }

  // Price range (on roomTypes.price)
  if (query.minPrice || query.maxPrice) {
    filter["roomTypes.price"] = {};
    if (query.minPrice) filter["roomTypes.price"].$gte = query.minPrice;
    if (query.maxPrice) filter["roomTypes.price"].$lte = query.maxPrice;
  }

  // Availability (at least one room with availableBeds > 0)
  if (query.availability === true) {
    filter["roomTypes.availableBeds"] = { $gt: 0 };
  }

  // Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  // Sorting
  const sortKey = query.sort || "newest";
  const sortOption = SORT_OPTIONS[sortKey] || SORT_OPTIONS.newest;
  const sortObj = { [sortOption.field]: sortOption.order };

  let hostels = [];
  let total = 0;

  // For price sorting, we need aggregation to get minPrice per hostel
  if (sortKey === "price_low" || sortKey === "price_high") {
    const pipeline = [
      { $match: filter },
      { $unwind: "$roomTypes" },
      {
        $group: {
          _id: "$_id",
          owner: { $first: "$owner" },
          name: { $first: "$name" },
          description: { $first: "$description" },
          address: { $first: "$address" },
          city: { $first: "$city" },
          genderPreference: { $first: "$genderPreference" },
          images: { $first: "$images" },
          roomTypes: { $push: "$roomTypes" },
          amenities: { $first: "$amenities" },
          contactNumber: { $first: "$contactNumber" },
          totalBeds: { $first: "$totalBeds" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          minPrice: { $min: "$roomTypes.price" },
        },
      },
      { $sort: { minPrice: sortOption.order } },
      { $skip: skip },
      { $limit: limit },
    ];

    const [countResult] = await Hostel.aggregate([
      { $match: filter },
      { $count: "total" },
    ]);
    total = countResult?.total || 0;
    hostels = await Hostel.aggregate(pipeline);
  } else {
    // Normal find with sorting
    const [data, count] = await Promise.all([
      Hostel.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .lean(),
      Hostel.countDocuments(filter),
    ]);
    hostels = data;
    total = count;
  }

  return {
    hostels,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};

export const getHostelById = async (id) => {
  return await Hostel.findById(id)
    .populate("owner", "name email phone profilePicture")
    .lean();
};