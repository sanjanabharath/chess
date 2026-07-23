import { Router } from "express";
import { v4 } from "uuid";
import { db } from "../lib/prisma.js";
import { COOKIE_MAX_AGE } from "../utils/constants.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
const router = Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173/game";

interface UserAuth {
  id: string;
  name: string;
  token: string;
  isGuest: boolean;
}

router.post("/guest", async (req: Request, res: Response) => {
  const bodyData = req.body;
  let getUUID = "guest-" + v4();
  const user = await db.user.create({
    data: {
      username: getUUID,
      email: getUUID + "@guest.com",
      provider: "guest",
      name: bodyData?.name || "Guest User",
    },
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET as string,
  );
  const UserDetails: UserAuth = {
    id: user.id,
    name: user.name!,
    token: token,
    isGuest: true,
  };
  res.cookie("guest", token, { maxAge: COOKIE_MAX_AGE });
  res.json(UserDetails);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
);

export default router;
