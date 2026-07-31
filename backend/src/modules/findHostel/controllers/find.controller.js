import { searchHostels, getHostelById } from "../services/find.service.js";

export const getHostels = async (req, res, next) => {
  try {
    const result = await searchHostels(req.query);
    res.status(200).json({
      success: true,
      message: "Hostels fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getHostelDetail = async (req, res, next) => {
  try {
    const hostel = await getHostelById(req.params.id);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Hostel detail fetched",
      data: { hostel },
    });
  } catch (error) {
    next(error);
  }
};