import { Router } from "express";
import { auth, adminAndSuperAdmin } from "../middlewares/auth.middlewares.js";
import {
  getUsers,
  createUser,
  login,
  logout,
  updateUser,
  getUsersFaculties,
  getToken,
  getUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/", getUsers);
router.get("/profile/:id", getUser);
router.post("/", createUser);
router.post("/login", login);
router.post("/logout", auth, logout);
router.put("/:id", auth, updateUser);
router.get("/faculties", adminAndSuperAdmin, getUsersFaculties);
router.post("/token", auth, getToken);

export default router;
