import express from "express";
import { register, login, logout, updateUsername } from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);
router.patch("/username", updateUsername);

export default router;