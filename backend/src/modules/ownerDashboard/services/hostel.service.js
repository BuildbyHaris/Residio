import { uploadToCloudinary, deleteFromCloudinary } from "../../../shared/media/uploadToCloudinary.js";

import {
  createHostelInDB,
  findHostelsByOwner,
  findHostelById,
  findActiveHostels,
  saveHostel,
  removeHostel,

} from "../repositories/hostel.repository.js";

// ---------- Helpers ----------
const parseJSONField = (value, fieldName) => {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`Invalid ${fieldName} format`);
  }
};

// ---------- Create Hostel ----------
export const createHostelService = async (ownerId, body, files) => {
  const {
    name,
    description,
    address,
    city,
    genderPreference,
    contactNumber,
    totalBeds,
  } = body;

  const roomTypes = parseJSONField(body.roomTypes, "roomTypes");

  if (!name || !address || !city || !genderPreference || !contactNumber || !totalBeds) {
    const err = new Error("Please fill all required fields");
    err.statusCode = 400;
    throw err;
  }

  if (!roomTypes || roomTypes.length === 0) {
    const err = new Error("At least one room type is required");
    err.statusCode = 400;
    throw err;
  }

  // Hostel-level images — ab {url, publicId} objects
  let hostelImages = [];
  if (files?.images?.length) {
    hostelImages = await Promise.all(
      files.images.map((file) => uploadToCloudinary(file.buffer, "risido/hostels"))
    );
  }

  // Room-type images (index-matched)
  const roomImageFiles = files?.roomImages || [];
  const roomImages = await Promise.all(
    roomImageFiles.map((file) => uploadToCloudinary(file.buffer, "risido/rooms"))
  );

  const roomTypesWithImages = roomTypes.map((rt, index) => ({
    ...rt,
    image: roomImages[index] || null,
  }));

  return createHostelInDB({
    owner: ownerId,
    name,
    description,
    address,
    city,
    genderPreference,
    roomTypes: roomTypesWithImages,
    amenities: body.amenities ? parseJSONField(body.amenities, "amenities") : [],
    images: hostelImages,
    contactNumber,
    totalBeds,
  });
};

// ---------- Get My Hostels ----------
export const getMyHostelsService = (ownerId) => {
  return findHostelsByOwner(ownerId);
};

// ---------- Update Hostel ----------
export const updateHostelService = async (hostelId, ownerId, body, files) => {
  const hostel = await findHostelById(hostelId);

  if (!hostel) {
    const err = new Error("Hostel not found");
    err.statusCode = 404;
    throw err;
  }

  if (hostel.owner._id.toString() !== ownerId.toString()) {
    const err = new Error("You are not authorized to edit this hostel");
    err.statusCode = 403;
    throw err;
  }

  const {
    name,
    description,
    address,
    city,
    genderPreference,
    contactNumber,
    totalBeds,
    status,
  } = body;

  let roomTypes;
  if (body.roomTypes) {
    roomTypes = parseJSONField(body.roomTypes, "roomTypes");
  }

  // Naye hostel images (append to existing)
  let hostelImages = hostel.images;
  if (files?.images?.length) {
    const newImages = await Promise.all(
      files.images.map((file) => uploadToCloudinary(file.buffer, "risido/hostels"))
    );
    hostelImages = [...hostel.images, ...newImages];
  }

  // Room-type images
  if (roomTypes && files?.roomImages?.length) {
    const roomImages = await Promise.all(
      files.roomImages.map((file) => uploadToCloudinary(file.buffer, "risido/rooms"))
    );
    roomTypes = roomTypes.map((rt, index) => ({
      ...rt,
      image: roomImages[index] || rt.image || null,
    }));
  }

  if (name) hostel.name = name;
  if (description !== undefined) hostel.description = description;
  if (address) hostel.address = address;
  if (city) hostel.city = city;
  if (genderPreference) hostel.genderPreference = genderPreference;
  if (contactNumber) hostel.contactNumber = contactNumber;
  if (totalBeds) hostel.totalBeds = totalBeds;
  if (status) hostel.status = status;
  if (roomTypes) hostel.roomTypes = roomTypes;
  if (body.amenities) hostel.amenities = parseJSONField(body.amenities, "amenities");
  hostel.images = hostelImages;

  return saveHostel(hostel);
};

// ---------- Delete Hostel ----------
export const deleteHostelService = async (hostelId, ownerId) => {
  const hostel = await findHostelById(hostelId);

  if (!hostel) {
    const err = new Error("Hostel not found");
    err.statusCode = 404;
    throw err;
  }

  if (hostel.owner._id.toString() !== ownerId.toString()) {
    const err = new Error("You are not authorized to delete this hostel");
    err.statusCode = 403;
    throw err;
  }

  // Cloudinary se images bhi clean karo (publicId se, orphan images avoid karne ke liye)
  const allPublicIds = [
    ...(hostel.images || []).map((img) => img.publicId),
    ...(hostel.roomTypes || []).map((rt) => rt.image?.publicId).filter(Boolean),
  ];

  if (allPublicIds.length) {
    await Promise.allSettled(allPublicIds.map((id) => deleteFromCloudinary(id)));
  }

  return removeHostel(hostel);
};

// ---------- Get All Active Hostels (public) ----------
export const getAllActiveHostelsService = (query) => {
  const { city, genderPreference } = query;
  const filter = { status: "Active" };

  if (city) filter.city = new RegExp(city, "i");
  if (genderPreference) filter.genderPreference = genderPreference;

  return findActiveHostels(filter);
};
// ---------- Get Hostel By ID (public) ----------
export const getHostelByIdService = async (hostelId) => {
  const hostel = await findHostelById(hostelId);

  if (!hostel) {
    const err = new Error("Hostel not found");
    err.statusCode = 404;
    throw err;
  }

  return hostel;
};