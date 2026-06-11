import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages.js";
import { Game } from "./Game.js";

// Classes need to be created -> User, Game

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null; // This should be a User class in the future.
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user != socket);
    // Stop the game here because the user left
    // This is bad, there should be a reconnecting logic that need to be added
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      // grpc logic can be used here
      const message = JSON.parse(data.toString());

      if (message.type == INIT_GAME) {
        if (this.pendingUser) {
          //Start the game
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if (message.type == MOVE) {
        const game = this.games.find(
          (game) => game.player1 == socket || game.player2,
        );
        if (game) {
          game.makeMove(socket, message.move); // This particular player is making a move
        }
      }
    });
  }
}
