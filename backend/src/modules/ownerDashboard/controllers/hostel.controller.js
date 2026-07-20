import Hostel from "../models/hostel.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// @desc    Create a new hostel (Owner only)
// @route   POST /api/v1/hostels
// @access  Private (Owner)
export const createHostel = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      city,
      genderPreference,
      amenities,
      contactNumber,
      totalBeds,
    } = req.body;

    // roomTypes aayega as JSON string (multipart/form-data ki wajah se), parse karna hoga
    let roomTypes;
    try {
      roomTypes = JSON.parse(req.body.roomTypes);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid roomTypes format",
      });
    }

    // Basic business validation
    if (!name || !address || !city || !genderPreference || !contactNumber || !totalBeds) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (!roomTypes || roomTypes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one room type is required",
      });
    }

    // ---------- Upload hostel-level images ----------
    let hostelImageUrls = [];
    if (req.files?.images?.length) {
      hostelImageUrls = await Promise.all(
        req.files.images.map((file) =>
          uploadToCloudinary(file.buffer, "risido/hostels")
        )
      );
    }

    // ---------- Upload room-type images (indexed match) ----------
    const roomImageFiles = req.files?.roomImages || [];
    const roomImageUrls = await Promise.all(
      roomImageFiles.map((file) =>
        uploadToCloudinary(file.buffer, "risido/rooms")
      )
    );

    // Attach uploaded image URL to each room type by index
    const roomTypesWithImages = roomTypes.map((rt, index) => ({
      ...rt,
      image: roomImageUrls[index] || null,
    }));

    const hostel = await Hostel.create({
      owner: req.user._id,
      name,
      description,
      address,
      city,
      genderPreference,
      roomTypes: roomTypesWithImages,
      amenities: amenities ? JSON.parse(amenities) : [],
      images: hostelImageUrls,
      contactNumber,
      totalBeds,
    });

    return res.status(201).json({
      success: true,
      message: "Hostel created successfully",
      data: hostel,
    });
  } catch (error) {
    console.error("Create Hostel Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while creating hostel",
    });
  }
};

// @desc    Get all hostels created by logged-in owner
// @route   GET /api/v1/hostels/my-hostels
// @access  Private (Owner)
export const getMyHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: hostels.length,
      data: hostels,
    });
  } catch (error) {
    console.error("Get My Hostels Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching your hostels",
    });
  }
};
// @desc    Update a hostel (Owner only, must own the hostel)
// @route   PUT /api/v1/hostels/:id
// @access  Private (Owner)
export const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    // Ownership check — sirf apni hostel edit kar sake
    if (hostel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this hostel",
      });
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
    } = req.body;

    // roomTypes agar bheji gayi hai to parse karo
    let roomTypes;
    if (req.body.roomTypes) {
      try {
        roomTypes = JSON.parse(req.body.roomTypes);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid roomTypes format",
        });
      }
    }

    // ---------- Naye images upload karo (agar bheji gayi hain) ----------
    let hostelImageUrls = hostel.images; // default: purani images retain
    if (req.files?.images?.length) {
      const newUrls = await Promise.all(
        req.files.images.map((file) =>
          uploadToCloudinary(file.buffer, "risido/hostels")
        )
      );
      hostelImageUrls = [...hostel.images, ...newUrls]; // append new to existing
    }

    // ---------- Room type images (agar bheji hain, index se match) ----------
    if (roomTypes && req.files?.roomImages?.length) {
      const roomImageUrls = await Promise.all(
        req.files.roomImages.map((file) =>
          uploadToCloudinary(file.buffer, "risido/rooms")
        )
      );
      roomTypes = roomTypes.map((rt, index) => ({
        ...rt,
        image: roomImageUrls[index] || rt.image || null,
      }));
    }

    // ---------- Update fields (jo bheje gaye hain wahi update honge) ----------
    if (name) hostel.name = name;
    if (description !== undefined) hostel.description = description;
    if (address) hostel.address = address;
    if (city) hostel.city = city;
    if (genderPreference) hostel.genderPreference = genderPreference;
    if (contactNumber) hostel.contactNumber = contactNumber;
    if (totalBeds) hostel.totalBeds = totalBeds;
    if (status) hostel.status = status;
    if (roomTypes) hostel.roomTypes = roomTypes;
    if (req.body.amenities) hostel.amenities = JSON.parse(req.body.amenities);
    hostel.images = hostelImageUrls;

    const updatedHostel = await hostel.save();

    return res.status(200).json({
      success: true,
      message: "Hostel updated successfully",
      data: updatedHostel,
    });
  } catch (error) {
    console.error("Update Hostel Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating hostel",
    });
  }
};

// @desc    Delete a hostel (Owner only, must own the hostel)
// @route   DELETE /api/v1/hostels/:id
// @access  Private (Owner)
export const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    // Ownership check — sirf apni hostel delete kar sake
    if (hostel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this hostel",
      });
    }

    await hostel.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Hostel deleted successfully",
    });
  } catch (error) {
    console.error("Delete Hostel Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting hostel",
    });
  }
};
// @desc    Get all active hostels (public listing for User Dashboard)
// @route   GET /api/v1/hostels
// @access  Public (or any logged-in user, no owner restriction)
export const getAllActiveHostels = async (req, res) => {
  try {
    const { city, genderPreference } = req.query;

    // Base filter — sirf Active hostels
    const filter = { status: "Active" };

    // Optional query filters (future-ready for search/filter feature)
    if (city) filter.city = new RegExp(city, "i"); // case-insensitive match
    if (genderPreference) filter.genderPreference = genderPreference;

    const hostels = await Hostel.find(filter)
      .populate("owner", "name email phone") // basic owner info, password already excluded by default
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: hostels.length,
      data: hostels,
    });
  } catch (error) {
    console.error("Get All Active Hostels Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching hostels",
    });
  }
};