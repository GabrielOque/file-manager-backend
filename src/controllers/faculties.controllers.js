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
    res.send(facultyCreated);
  } catch (error) {
    res.send({ message: "A ocurrido un error" });
  }
};
