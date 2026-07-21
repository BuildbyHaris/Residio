import {
  createHostelService,
  getMyHostelsService,
  updateHostelService,
  deleteHostelService,
  getAllActiveHostelsService,
} from "../services/hostel.service.js";

// Common error responder — statusCode agar service ne set kiya hai to wahi use hoga
const handleError = (res, error, fallbackMessage) => {
  console.error(fallbackMessage + ":", error.message);
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.statusCode ? error.message : fallbackMessage,
  });
};

// @desc    Create a new hostel (Owner only)
// @route   POST /api/v1/hostels
// @access  Private (Owner)
export const createHostel = async (req, res) => {
  try {
    const hostel = await createHostelService(req.user._id, req.body, req.files);
    return res.status(201).json({
      success: true,
      message: "Hostel created successfully",
      data: hostel,
    });
  } catch (error) {
    return handleError(res, error, "Server error while creating hostel");
  }
};

// @desc    Get all hostels created by logged-in owner
// @route   GET /api/v1/hostels/my-hostels
// @access  Private (Owner)
export const getMyHostels = async (req, res) => {
  try {
    const hostels = await getMyHostelsService(req.user._id);
    return res.status(200).json({
      success: true,
      count: hostels.length,
      data: hostels,
    });
  } catch (error) {
    return handleError(res, error, "Server error while fetching your hostels");
  }
};

// @desc    Update a hostel (Owner only, must own the hostel)
// @route   PUT /api/v1/hostels/:id
// @access  Private (Owner)
export const updateHostel = async (req, res) => {
  try {
    const hostel = await updateHostelService(req.params.id, req.user._id, req.body, req.files);
    return res.status(200).json({
      success: true,
      message: "Hostel updated successfully",
      data: hostel,
    });
  } catch (error) {
    return handleError(res, error, "Server error while updating hostel");
  }
};

// @desc    Delete a hostel (Owner only, must own the hostel)
// @route   DELETE /api/v1/hostels/:id
// @access  Private (Owner)
export const deleteHostel = async (req, res) => {
  try {
    await deleteHostelService(req.params.id, req.user._id);
    return res.status(200).json({
      success: true,
      message: "Hostel deleted successfully",
    });
  } catch (error) {
    return handleError(res, error, "Server error while deleting hostel");
  }
};

// @desc    Get all active hostels (public listing for User Dashboard)
// @route   GET /api/v1/hostels
// @access  Public
export const getAllActiveHostels = async (req, res) => {
  try {
    const hostels = await getAllActiveHostelsService(req.query);
    return res.status(200).json({
      success: true,
      count: hostels.length,
      data: hostels,
    });
  } catch (error) {
    return handleError(res, error, "Server error while fetching hostels");
  }
};
