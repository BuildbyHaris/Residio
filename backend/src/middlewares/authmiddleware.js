const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  let token;

  // 1. Business Standard: Token ko browser ki cookies se nikalna
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. Token ki verification check karna
  if (token) {
    try {
      // Secret key se token verify karna
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");

      // User ka data request mein add karna (password ke baghair)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next(); // Agar sab theek hai to agle function par bhej do
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 3. Agar token na mile to access block karna
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { authMiddleware };
