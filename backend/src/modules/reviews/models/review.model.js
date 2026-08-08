import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    isVerifiedStay: {
    type: Boolean,
    default: false
}
  },
  {
    timestamps: true,
  }
);

// Ek user ek hostel par sirf ek review de sakta hai
reviewSchema.index(
  { hostel: 1, user: 1 },
  { unique: true }
);

export default mongoose.model("Review", reviewSchema);