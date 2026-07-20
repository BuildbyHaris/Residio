import streamifier from "streamifier";
import cloudinary from "../../../config/cloudinary.js";

/**
 * Uploads a file buffer to Cloudinary and returns the secure URL
 * @param {Buffer} fileBuffer - the image buffer from multer
 * @param {string} folder - Cloudinary folder to organize uploads
 * @returns {Promise<string>} secure_url of uploaded image
 */
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
