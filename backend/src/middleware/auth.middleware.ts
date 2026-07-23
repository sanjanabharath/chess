import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "TOP_SECRET_KEY";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    //@ts-ignore
    (req as any).userId = decoded.userId as string;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}
