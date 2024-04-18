import { Router } from "express";
import { register, login, logout, profile, getUsers, getUser, searchUserForUsername, updateUser, changePassword, disableUser, enableUser } from "../controllers/auth.controller.js";
import { authRequiredAllUsers } from "../middlewares/validateTokenAllUsers.js";
import { authRequiredAdmin } from "../middlewares/validateTokenAdmin.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequiredAllUsers, profile);
router.get("/users", authRequiredAdmin, getUsers);
router.get("/users/:id", authRequiredAdmin, getUser);
router.get("/searchUserForUsername/:username", authRequiredAdmin, searchUserForUsername);
router.put("/updateUser/:id", authRequiredAdmin, updateUser);
router.put("/changePassword/:id", authRequiredAllUsers, changePassword);
router.put("/disableUser/:id", authRequiredAdmin, disableUser);
router.put("/enableUser/:id", authRequiredAdmin, enableUser);

export default router;