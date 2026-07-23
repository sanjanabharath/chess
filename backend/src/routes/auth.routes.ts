import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/game", authenticate, (req, res) => {
  res.json({
    message: "Login before starting the game",
  });
});

export default router;
