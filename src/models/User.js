import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar: { url: String, public_id: String },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  rol: { type: String, trim: true },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
});

export default mongoose.model("User", userSchema);
