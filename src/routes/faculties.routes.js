import { Router } from "express";
import { superAdmin, auth } from "../middlewares/auth.middlewares.js";
import {
  getFaculties,
  createFaculties,
  updateFaculty,
  deleteFaculty,
} from "../controllers/faculties.controllers.js";
const router = Router();

router.get("/", superAdmin, getFaculties);
router.post("/", superAdmin, createFaculties);
router.put("/:id", auth, superAdmin, updateFaculty);
router.delete("/:id", auth, superAdmin, deleteFaculty);

export default router;
