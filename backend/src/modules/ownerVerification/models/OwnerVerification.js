import mongoose from "mongoose";

const ownerVerificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    cnic: {
      type: String,
      required: [true, "CNIC is required"],
      trim: true,
      unique: true,
      match: [/^[0-9]{13}$/, "CNIC must be exactly 13 digits"],
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },

    hostelName: {
      type: String,
      required: [true, "Hostel name is required"],
      trim: true,
      minlength: [3, "Hostel name must be at least 3 characters"],
      maxlength: [100, "Hostel name cannot exceed 100 characters"],
    },

    hostelType: {
      type: String,
      required: [true, "Hostel type is required"],
      enum: ["boys", "girls", "both"],
    },

    hostelAddress: {
      type: String,
      required: [true, "Hostel address is required"],
      trim: true,
      minlength: [10, "Hostel address must be at least 10 characters"],
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    province: {
      type: String,
      required: [true, "Province is required"],
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
    },

    totalRooms: {
      type: Number,
      required: [true, "Total rooms are required"],
      min: [1, "Total rooms must be at least 1"],
    },

    totalBeds: {
      type: Number,
      required: [true, "Total beds are required"],
      min: [1, "Total beds must be at least 1"],
    },

    startingRent: {
      type: Number,
      required: [true, "Starting rent is required"],
      min: [1, "Rent must be greater than 0"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    cnicFrontImage: {
      type: String,
      required: [true, "CNIC front image is required"],
      trim:true,
    },

    cnicBackImage: {
      type: String,
      required: [true, "CNIC back image is required"],
      trim:true,
    },

    propertyProof: {
      type: String,
      required: [true, "Property ownership proof is required"],
    },

    selfieWithCnic: {
      type: String,
      required: [true, "Selfie with CNIC is required"],
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index:true,
    },

    adminRemark: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const OwnerVerification = mongoose.model(
  "OwnerVerification",
  ownerVerificationSchema
);

export default OwnerVerification;