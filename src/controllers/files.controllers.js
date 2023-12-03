import fs from "fs-extra";
import File from "../models/File.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import { uploadFile, deleteFileCloudinary } from "../libs/cloudinary.js";

export const getFiles = async (req, res) => {
  const { id } = req.params;
  try {
    const filesFound = await File.find({ author: id });
    return res.send(filesFound);
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};

export const createFile = async (req, res) => {
  const { author, name, description } = req.body;
  try {
    let file = null;
    const result = await uploadFile(req.files.file.tempFilePath);
    await fs.remove(req.files.file.tempFilePath);
    file = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    const newFile = new File({
      author,
      name,
      description,
      file: file,
    });

    const fileCreated = await newFile.save();

    const userAsignedFile = await User.findOne({ _id: author });
    userAsignedFile.files.push(fileCreated._id);
    await userAsignedFile.save();

    return res.send(fileCreated);
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};

export const approveFile = async (req, res) => {
  const { id } = req.params;
  const newStatus = req.body;
  try {
    const fileApproved = await File.findOneAndUpdate(
      { _id: id },
      { status: newStatus },
      { new: true }
    );
    console.log(fileApproved);
    return res.send(fileApproved);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    const fileDeleted = await File.findOneAndDelete({ _id: id });
    const userAsignedFile = await User.findOne({ _id: fileDeleted.author });
    userAsignedFile.files.pull(fileDeleted._id);
    await userAsignedFile.save();
    await deleteFileCloudinary(fileDeleted.file.public_id);
    await Comment.deleteMany({ file: id });
    return res.send(fileDeleted);
  } catch (error) {
    console.log(error);
  }
};
