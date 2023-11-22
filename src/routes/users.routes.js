import { Router } from "express";
import {
  auth,
  adminAndSuperAdmin,
  superAdmin,
} from "../middlewares/auth.middlewares.js";
import {
  getUsers,
  createUser,
  login,
  logout,
  updateUser,
  getUsersFaculties,
} from "../controllers/users.controllers.js";
const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", login);
router.post("/logout", auth, logout);
router.put("/:id", auth, updateUser);
router.get("/faculties", adminAndSuperAdmin, getUsersFaculties);

export default router;
