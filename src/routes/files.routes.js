import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import {
  getFiles,
  createFile,
  approveFile,
  deleteFile,
} from "../controllers/files.controllers.js";

const router = Router();

router.get("/:id", auth, getFiles);
router.post("/", auth, createFile);
router.put("/:id", auth, approveFile);
router.delete("/:id", auth, deleteFile);

export default router;
