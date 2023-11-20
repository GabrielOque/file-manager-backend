import { Router } from "express";
import {
  getFaculties,
  createFaculties,
} from "../controllers/faculties.controllers.js";
const router = Router();

router.get("/", getFaculties);
router.post("/", createFaculties);

export default router;
