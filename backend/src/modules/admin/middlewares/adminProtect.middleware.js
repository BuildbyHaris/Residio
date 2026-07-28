import jwt from "jsonwebtoken";
import User from "../../auth/models/User.js";
import { env } from "../../../config/env.js";

export const adminProtect = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies?.adminAccessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Admin authentication required.",
      });
    }
    const decoded = jwt.verify(
      token,
      env.jwtSecret
    );
    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid admin authentication token.",
      });
    }
    const admin = await User.findById(
      decoded.id
    ).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Admin account not found.",
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to access the Admin Panel.",
      });
    }
    req.user = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired admin session.",
    });
  }
};

export default adminProtect;