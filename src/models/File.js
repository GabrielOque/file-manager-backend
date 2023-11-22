import mongoose from "mongoose";
const fileSchema = new mongoose.Schema(
  {
    file: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      approver: { type: String, default: null },
      isApproved: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
