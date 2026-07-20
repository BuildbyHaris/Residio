import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      match: [
        /^(\+92|0)?3[0-9]{9}$/,
        "Please enter a valid Pakistani phone number",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["buyer", "owner"],
      default: "buyer",
      required: true,
    },

    // ==========================
    // Email Verification
    // ==========================

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailOtp: {
      type: String,
      default: null,
      select: false,
    },

    emailOtpExpires: {
      type: Date,
      default: null,
    },

    lastOtpSentAt: {
      type: Date,
      default: null,
    },
    profileImage: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    ownerStatus: {
      type: String,
      enum: [
        "buyer",
        "pending_owner",
        "owner",
        "rejected_owner",
      ],
      default: "buyer",
    },

    rejectionReason: {
      type: String,
      default: "",
    },
    ownerVerification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerVerification",
      default: null,
    },

    ownerProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OwnerProfile",
      default: null,
    },

    ownerApprovedAt: {
      type: Date,
      default: null,
    },

    ownerApprovedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;