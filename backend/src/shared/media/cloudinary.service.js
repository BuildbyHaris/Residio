import { Readable } from "stream";
import cloudinary from "../../config/cloudinary.js";


export const uploadFile = (
  buffer,
  folder = "residio",
  resourceType = "image"
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
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


export const uploadImage = (
  buffer,
  folder = "residio"
) => {
  return uploadFile(
    buffer,
    folder,
    "image"
  );
};


export const deleteFile = async (
  publicId,
  resourceType = "image"
) => {
  if (!publicId) return;

  return await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};


export const deleteImage = async (
  publicId
) => {
  return deleteFile(publicId, "image");
};