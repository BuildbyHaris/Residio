import Hostel from "../models/hostel.model.js";

// Sirf DB access yahan hota hai — koi business logic nahi

export const createHostelInDB = (data) => {
  return Hostel.create(data);
};

export const findHostelsByOwner = (ownerId) => {
  return Hostel.find({ owner: ownerId }).sort({ createdAt: -1 });
};

export const findHostelById = (id) => {
  return Hostel.findById(id).populate("owner", "name email phone profileImage isVerified");
};

export const findActiveHostels = (filter) => {
  return Hostel.find(filter)
    .populate("owner", "name email phone profileImage isVerified")
    .sort({ createdAt: -1 });
};

export const saveHostel = (hostelDoc) => {
  return hostelDoc.save();
};

export const removeHostel = (hostelDoc) => {
  return hostelDoc.deleteOne();
};
