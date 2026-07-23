import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);
authRouter.get("/game", authenticate, (req, res) => {
  res.json({
    message: "Login before starting the game",
  });
});

export default authRouter;
