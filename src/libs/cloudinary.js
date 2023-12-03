import { v2 as cloudinary } from "cloudinary";
import { API_SECRET, CLOUD_NAME, API_KEY } from "../config.js";
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "avatars",
  });
};

export const uploadFile = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "Files",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const deleteFileCloudinary = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
