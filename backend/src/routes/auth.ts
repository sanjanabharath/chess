import { Router } from "express";
import { hashPassword, verifyPassword, generateToken } from "../utils/auth.js";

const router = Router();
const user: Record<
  string,
  { id: string; email: string; passwordHash: string }
> = {};

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (user[email]) {
    return res.status(400).json({ message: "User already exists" });
  }

  const passwordHash = await hashPassword(password);
  const userId = Date.now().toString();
  user[email] = { id: userId, email, passwordHash };

  const token = generateToken(userId);
  res.status(201).json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = user[email];
  if (!existingUser) {
    return res.status(400).json({ message: "Invalid email. Check your email" });
  }

  const isPasswordValid = await verifyPassword(
    password,
    existingUser.passwordHash,
  );
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Invalid password. Check your password" });
  }

  const token = generateToken(existingUser.id);
  res.status(200).json({ token });
});

export default router;
