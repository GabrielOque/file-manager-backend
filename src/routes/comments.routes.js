import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import {
  getComments,
  createComment,
} from "../controllers/comments.controllers.js";
const router = Router();

router.get("/:id", auth, getComments);
router.post("/", auth, createComment);

export default router;
