import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import { db } from "./config/database.js";
import { authenticate } from "./middleware/auth.middleware.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

app.get("/me", authenticate, async (req, res) => {
  const user = await db.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      email: true,
    },
  });

  res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
