import { v2 as cloudinary } from "cloudinary";
import { API_SECRET, CLOUD_NAME, API_KEY } from "../config";
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

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
