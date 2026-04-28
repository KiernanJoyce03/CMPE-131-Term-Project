import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// Generates a unique username from email prefix + random number
const generateUsername = async (email) => {
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let username;
  let taken = true;
  while (taken) {
    const suffix = Math.floor(1000 + Math.random() * 9000);
    username = `${base}_${suffix}`;
    const exists = await prisma.user.findUnique({ where: { username } });
    taken = !!exists;
  }
  return username;
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const username = await generateUsername(email);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    const token = generateToken(user.id, res);

    res.status(201).json({
      status: "success",
      data: {
        user: { id: user.id, email: user.email },
        token,
      },
    });
  } catch (error) {
    console.error("register error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { userId, username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const taken = await prisma.user.findUnique({ where: { username } });
    if (taken) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { username },
    });

    res.status(200).json({
      status: "success",
      data: { user: { id: user.id, username: user.username, email: user.email } },
    });
  } catch (error) {
    console.error("updateUsername error:", error);
    res.status(500).json({ error: "Failed to update username" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user.id, res);

    res.status(200).json({
      status: "success",
      data: {
        user: { id: user.id, name: user.name, email: user.email },
        token,
      },
    });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ status: "success", message: "Logged out successfully" });
};

export { register, login, logout, updateUsername };
