import bcrypt from "bcrypt";
import fs from "fs-extra";
import User from "../models/User.js";
import { createAccessToken } from "../libs/jwt.js";
import { uploadImage } from "../libs/cloudinary.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

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
      domain: ".onrender.com",
      sameSite: "None",
      secure: true,
    });

    // res.cookie("token", token);

    return res.send(userFound);
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { _id, password, name, lastName, avatar } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    let image = null;
    if (!avatar) {
      const result = await uploadImage(req.files.avatar.tempFilePath);
      await fs.remove(req.files.avatar.tempFilePath);
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else {
      image = avatar;
    }

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
  } catch (error) {
    console.log(error);
    return res.send({ message: "A ocurrido un error" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const getToken = async (req, res) => {
  try {
    return res.send(req.user);
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};
