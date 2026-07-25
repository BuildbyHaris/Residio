import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Single", "Double", "Triple", "Dormitory"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availableBeds: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String, // Cloudinary secure_url
      default: null,
    },
  },
  { _id: false }
);

const hostelSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Hostel name is required"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      index: true,
    },

    genderPreference: {
      type: String,
      enum: ["Boys", "Girls", "Co-ed"],
      required: true,
    },

    roomTypes: {
      type: [roomTypeSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one room type is required",
      },
    },

    amenities: {
      type: [String],
      enum: [
        "WiFi",
        "Food",
        "Laundry",
        "Parking",
        "AC",
        "Security",
        "Power Backup",
        "Hot Water",
      ],
      default: [],
    },

    images: {
      type: [String], // Hostel-level general photos (building, common area etc.)
      default: [],
    },

    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^[0-9]{11}$/, "Enter a valid 11-digit contact number"],
    },

    totalBeds: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hostel", hostelSchema);