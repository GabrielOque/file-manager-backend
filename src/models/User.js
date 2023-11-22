import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: null },
    lastName: { type: String, trim: true, default: null },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    avatar: {
      url: { type: String, default: null },
      public_id: { type: String, default: null },
    },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
    rol: { type: String, trim: true },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
