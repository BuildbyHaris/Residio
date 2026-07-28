export const adminOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Admin authentication required.",
    });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message:
        "You are not authorized to access the Admin Panel.",
    });
  }
  next();
};

export default adminOnly;