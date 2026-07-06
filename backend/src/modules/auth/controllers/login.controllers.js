const bcrypt = require("bcryptjs");
const generateToken = require("../util/generateToken");
const User = require("../models/User");

const login = async (req, res) => {
  try {
    // 1.  Call  'rememberMe' state  from Frontend
    const { email, password, rememberMe } = req.body;

    // 2. Validation Rule (Fields checking)
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found"
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Verify OTP First"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = generateToken(user._id);

    // 3. Business Standard: Cookie configurations options setting
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
    };

    // 4. Remember Me Configuration
    if (rememberMe) {
      
      cookieOptions.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 Days in milliseconds
    } 
    // Note: Agar user select nahi karta, to 'maxAge' set nahi hogi, 
    // jis se yeh ek 'Session Cookie' ban jayegi aur browser close hote hi expire ho jayegi.

    // 5. Data Leakage Control:
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;

    // 6. Response Setting:
    res.cookie("token", token, cookieOptions).json({
      message: "Login Successful",
      user: userObject
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { login };
