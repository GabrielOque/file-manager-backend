import fs from "fs-extra";
import Files from "../models/File.js";
import User from "../models/User.js";
import { uploadFile } from "../libs/cloudinary.js";

export const getFiles = async (req, res) => {
  const { id } = req.params;
  try {
    const filesFound = await Files.find({ author: id });
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

    const newFile = new Files({
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
