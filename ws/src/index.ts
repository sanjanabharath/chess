import { WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";
import { GameManager } from "./GameManager.js";

interface AuthenticatedRequest extends IncomingMessage {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET!;

const wss = new WebSocketServer({ port: 3000 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws, req: AuthenticatedRequest) {
  ws.on("error", console.error);

  try {
    const url = new URL(req.url!, "http://localhost");

    const token = url.searchParams.get("token");

    if (!token) {
      ws.close(1008, "Unauthorized");
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    req.userId = decoded.userId;

    console.log("Authenticated:", req.userId);

    gameManager.addUser(ws, req.userId);

    ws.on("close", () => {
      gameManager.removeUser(ws);
    });
  } catch (err) {
    console.error(err);
    ws.close(1008, "Invalid token");
  }
});
