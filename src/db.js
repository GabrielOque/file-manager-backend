import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
const conectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("Connect to", db.connection.name);
  } catch (err) {
    console.log(err);
  }
};
export default conectDB;
