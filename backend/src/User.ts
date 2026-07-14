import { WebSocket } from "ws";

export class User {
  private socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
  }

  getSocket(): WebSocket {
    return this.socket;
  }
}
