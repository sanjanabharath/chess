import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await authService.register(email, password);

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
}
