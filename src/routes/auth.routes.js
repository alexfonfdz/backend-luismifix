import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import authRequiredAllUsers from "../middlewares/validateTokenAllUsers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequiredAllUsers, profile);

export default router;