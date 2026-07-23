import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    (req as any).user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}
