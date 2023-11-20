import User from "../models/User.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    const usersFound = await User.find();
    res.send(usersFound);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  const { email, password, rol, faculty } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: passwordHash,
      rol,
      faculty,
      name: email.split("@")[0],
      lastName: email.split("@")[0],
    });
    const userCreated = await newUser.save();
    res.send(userCreated);
  } catch (error) {
    res.send({ message: "A ocurrido un error" });
  }
};
