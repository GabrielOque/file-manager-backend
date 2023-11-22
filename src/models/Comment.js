import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    author: {
      idAthor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      nameAuthor: { type: String, required: true },
    },
    file: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
