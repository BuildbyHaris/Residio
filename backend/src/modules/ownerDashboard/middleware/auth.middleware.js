export { protect } from "../../auth/middlewares/protect.middleware.js";

// Role-check middleware — auth module me exist nahi karta, isliye yahan define
export const authorizeOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      success: false,
      message: "Internal Auth Error: User identity context not initialized.",
    });
  }

  if (req.user.role !== "owner") {
    return res.status(403).json({
      success: false,
      message: `Forbidden: Only owners can perform this action. Your role: ${req.user.role}`,
    });
  }

  next();
};