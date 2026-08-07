import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

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
      type: imageSchema,
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
      type: [imageSchema],
      default: [],
    },
    
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return /^(?:\+92|0)[0-9]{10,11}$/.test(value);
        },
        message: "Enter a valid Pakistan contact number"
      }
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
    rating: {
  type: Number,
  default: 0,
  min: 0,
  max: 5,
},

reviewCount: {
  type: Number,
  default: 0,
},
  },
  { timestamps: true }
);

export default mongoose.model("Hostel", hostelSchema);