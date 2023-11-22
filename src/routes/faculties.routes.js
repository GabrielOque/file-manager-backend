import { Router } from "express";
import { superAdmin } from "../middlewares/auth.middlewares.js";
import {
  getFaculties,
  createFaculties,
} from "../controllers/faculties.controllers.js";
const router = Router();

router.get("/", superAdmin, getFaculties);
router.post("/", superAdmin, createFaculties);

export default router;
