import bcrypt from "bcrypt";
import fs from "fs-extra";
import User from "../models/User.js";
import File from "../models/File.js";
import Comment from "../models/Comment.js";
import { createAccessToken } from "../libs/jwt.js";
import { uploadImage } from "../libs/cloudinary.js";

function generateRandomCode() {
  return Math.floor(10000 + Math.random() * 90000);
}

export const getUsers = async (req, res) => {
  try {
    const usersFound = await User.find();
    return res.send(usersFound);
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await User.findOne({ _id: id });
    console.log(userFound);
    return res.send(userFound);
  } catch (error) {
    console.log(error);
  }
};

export const getUsersFaculties = async (req, res) => {
  const { faculty } = req.query;
  try {
    const usersFound = await User.find({ faculty: faculty })
      .populate("files")
      .exec();

    console.log(usersFound);
    return res.send(usersFound);
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};

export const createUser = async (req, res) => {
  const { email, rol, faculty } = req.body;
  try {
    const password = generateRandomCode().toString();
    console.log(password);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: passwordHash,
      rol,
      faculty,
    });

    const userCreated = await newUser.save();

    return res.send(userCreated);
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) return res.send({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.send({ message: "Contraseña incorrecta" });
    const token = await createAccessToken({
      _id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      email: userFound.email,
      rol: userFound.rol,
      faculty: userFound.faculty,
      avatar: userFound.avatar,
      files: userFound.files,
      password: userFound.password,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    console.log(token);
    return res.send(userFound);
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, name, lastName, avatar } = req.body;
  console.log(req.body);
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    let image = null;
    if (req?.files?.avatar) {
      const result = await uploadImage(req.files.avatar.tempFilePath);
      await fs.remove(req.files.avatar.tempFilePath);
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else {
      image = avatar;
    }

    if (password === "") {
      const newUpdate = {
        _id,
        name,
        lastName,
        avatar: image,
      };

      const userUpdated = await User.findByIdAndUpdate(id, newUpdate, {
        new: true,
      });
      return res.send(userUpdated);
    } else {
      const newUpdate = {
        _id,
        password: passwordHash,
        name,
        lastName,
        avatar: image,
      };

      const userUpdated = await User.findByIdAndUpdate(id, newUpdate, {
        new: true,
      });
      return res.send(userUpdated);
    }
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res.sendStatus(200);
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Encuentra y elimina los archivos asociados al usuario
    const filesToDelete = await File.find({ author: userId });
    await File.deleteMany({ author: userId });
    console.log(filesToDelete);
    // Para cada archivo eliminado, elimina los comentarios asociados
    for (let file of filesToDelete) {
      await Comment.deleteMany({ file: file._id });
    }

    // Finalmente, elimina el usuario
    const userDeleted = await User.findByIdAndDelete(userId);

    console.log(userDeleted);
    return res.send(userDeleted);
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};

export const getToken = async (req, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};
