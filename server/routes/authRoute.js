import express from "express";
import { z } from "zod";
import { register, login, logout, updateUsername, me } from "../controller/authController.js";
import protect from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email({ error: "Invalid email address" }),
  password: z.string().min(6, { error: "Password must be at least 6 characters" }),
});

const loginSchema = z.object({
  email: z.string().email({ error: "Invalid email address" }),
  password: z.string().min(1, { error: "Password is required" }),
});

const usernameSchema = z.object({
  username: z.string()
    .min(3, { error: "Username must be at least 3 characters" })
    .max(30, { error: "Username must be under 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { error: "Username can only contain letters, numbers, and underscores" }),
});

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);
router.patch("/username", protect, validateRequest(usernameSchema), updateUsername);
router.get("/me", protect, me);

export default router;