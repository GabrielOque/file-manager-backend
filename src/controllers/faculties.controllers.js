import Faculty from "../models/Faculty.js";

export const getFaculties = async (req, res) => {
  try {
    const facultiesFound = await Faculty.find();
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
