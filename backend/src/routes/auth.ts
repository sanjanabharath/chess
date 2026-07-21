import { Router } from "express";

const router = Router();

router.post("/guest", async (req: Request, res: Response) => {
  const bodyData = req.body;
  let getUUID = "guest-" + uuidv4();
});
