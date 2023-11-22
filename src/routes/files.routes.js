import { Router } from "express";
import { auth, superAdmin } from "../middlewares/auth.middlewares.js";
import { getFiles, createFile } from "../controllers/files.controllers.js";

const router = Router();

router.get("/:id", auth, getFiles);
router.post("/", auth, createFile);

export default router;
