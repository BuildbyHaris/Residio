/**
 * Allow only Admin users
 */
export const adminOnly = (
  req,
  res,
  next
) => {
  console.log("🔥 ADMIN ONLY HIT");
  console.log("REQ.USER:", req.user);

  if (!req.user) {
    console.log("❌ NO USER");

    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  console.log("👤 USER ROLE:", req.user.role);

  if (req.user.role !== "admin") {
    console.log("❌ NOT AN ADMIN");

    return res.status(403).json({
      success: false,
      message:
        "You are not authorized to access this resource.",
    });
  }

  console.log("✅ ADMIN CHECK PASSED");

  next();
};