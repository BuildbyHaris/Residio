import Hostel from "../../ownerDashboard/models/hostel.model.js";
import { SORT_OPTIONS, DEFAULT_LIMIT } from "../constants/find.constants.js";

export const searchHostels = async (query) => {
  const filter = { status: "Active" };

  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.$or = [{ name: regex }, { city: regex }, { address: regex }];
  }
  if (query.gender) filter.genderPreference = query.gender;
  if (query.roomType) filter["roomTypes.type"] = query.roomType;
  if (query.minPrice || query.maxPrice) {
    filter["roomTypes.price"] = {};
    if (query.minPrice) filter["roomTypes.price"].$gte = parseInt(query.minPrice);
    if (query.maxPrice) filter["roomTypes.price"].$lte = parseInt(query.maxPrice);
  }
  if (query.availability === "true") filter["roomTypes.availableBeds"] = { $gt: 0 };
  if (query.amenities) filter.amenities = { $all: query.amenities };
  if (query.minRating) filter.rating = { $gte: parseInt(query.minRating) };
  if (query.city) filter.city = { $regex: query.city, $options: "i" };

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  const sortKey = query.sort || "newest";
  const sortOption = SORT_OPTIONS[sortKey] || SORT_OPTIONS.newest;
  const sortObj = { [sortOption.field]: sortOption.order };

  let hostels = [];
  let total = 0;

  if (sortKey === "price_low" || sortKey === "price_high") {
    const pipeline = [
      { $match: filter },
      { $unwind: "$roomTypes" },
      {
        $group: {
          _id: "$_id",
          owner: { $first: "$owner" },
          name: { $first: "$name" },
          city: { $first: "$city" },
          address: { $first: "$address" },
          genderPreference: { $first: "$genderPreference" },
          images: { $first: "$images" },
          roomTypes: { $push: "$roomTypes" },
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
    const [data, count] = await Promise.all([
      Hostel.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
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
  return await Hostel.findById(id).populate("owner", "name email phone").lean();
}