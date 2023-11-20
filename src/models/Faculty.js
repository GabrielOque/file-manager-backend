import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: { type: String, trim: true, require: true, unique: true },
});

export default mongoose.model("Faculty", facultySchema);
