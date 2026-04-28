import express from "express";
import { register, login, logout, updateUsername, me } from "../controller/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);
router.patch("/username", updateUsername);
router.get("/me", protect, me);

export default router;