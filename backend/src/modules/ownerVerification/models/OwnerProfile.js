import mongoose from "mongoose";

const ownerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // ===========================
    // Business Information
    // ===========================

    businessName: {
      type: String,
      trim: true,
      default: "",
    },

    businessType: {
      type: String,
      enum: ["individual", "company"],
      default: "individual",
    },

    experience: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Address
    // ===========================

    province: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    postalCode: {
      type: String,
      default: "",
    },

    // ===========================
    // Dashboard Stats
    // ===========================

    totalProperties: {
      type: Number,
      default: 0,
    },

    activeListings: {
      type: Number,
      default: 0,
    },

    pendingListings: {
      type: Number,
      default: 0,
    },

    rejectedListings: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },

    totalEarnings: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // ===========================
    // Status
    // ===========================

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const OwnerProfile = mongoose.model(
  "OwnerProfile",
  ownerProfileSchema
);

export default OwnerProfile;