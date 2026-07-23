import bcrypt from "bcrypt";
import { db } from "../config/database.js";
import { generateToken } from "../utils/jwt.js";

export async function register(email: string, password: string) {
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
}

export async function login(email: string, password: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user.id);

  return { token, user: { id: user.id, email: user.email } };
}
