import { Readable } from "stream";
import cloudinary from "../../config/cloudinary.js";

/**
 * Upload image to Cloudinary
 */
export const uploadImage = (
  buffer,
  folder = "residio"
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

/**
 * Delete image from Cloudinary
 */
export const deleteImage = async (
  publicId
) => {

  if (!publicId) return;

  return await cloudinary.uploader.destroy(
    publicId
  );

};