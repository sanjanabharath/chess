import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "TOP_SECRET_KEY";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};
