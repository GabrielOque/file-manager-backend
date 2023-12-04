import Faculty from "../models/Faculty.js";
import User from "../models/User.js";
import File from "../models/File.js";
import Comment from "../models/Comment.js";

export const getFaculties = async (req, res) => {
  try {
    const facultiesFound = await Faculty.find();
    console.log(facultiesFound);
    res.send(facultiesFound);
  } catch (error) {
    console.log(error);
  }
};

export const createFaculties = async (req, res) => {
  const { name } = req.body;
  try {
    const newFaculty = new Faculty({
      name,
    });
    const facultyCreated = await newFaculty.save();
    return res.send(facultyCreated);
  } catch (error) {
    return res.send({ message: "A ocurrido un error" });
  }
};

export const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const facultyUpdated = await Faculty.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    );
    res.send(facultyUpdated);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    // Primero, elimina la facultad
    const facultyDeleted = await Faculty.findByIdAndDelete(id);

    // Luego, encuentra y elimina los usuarios asociados a la facultad
    const usersToDelete = await User.find({ faculty: id });
    const usersDeleted = await User.deleteMany({ faculty: id });

    // A continuación, para cada usuario eliminado, elimina los archivos y comentarios asociados
    for (let user of usersToDelete) {
      const filesToDelete = await File.find({ author: user._id });
      const filesDeleted = await File.deleteMany({ author: user._id });

      for (let file of filesToDelete) {
        await Comment.deleteMany({ file: file._id });
      }
    }
    return res.send(facultyDeleted);
  } catch (error) {
    console.log(error);
  }
};
