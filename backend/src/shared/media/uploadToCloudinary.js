import streamifier from "streamifier";
import cloudinary from "../../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, folder = "risido/hostels") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};
// uploadToCloudinary.js ke end mein yeh add karein:
export const deleteFromCloudinary = async (publicId) => {
  console.log("Mock delete triggered for:", publicId);
  return { result: "ok" };
};
