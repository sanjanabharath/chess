import { WebSocket } from "ws";
import { INIT_GAME, MOVE, WAITING_FOR_OPPONENT } from "./messages.js";
import { Game } from "./Game.js";
import { User } from "./User.js";

// Classes need to be created -> User, Game

export class GameManager {
  private games: Game[];
  private pendingUser: User | null;
  private users: User[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: WebSocket, userId: string) {
    const user = new User(socket);
    this.users.push(user);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user.getSocket() != socket);
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
          const game = new Game(this.pendingUser.getSocket(), socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = new User(socket);
          socket.send(
            JSON.stringify({
              type: WAITING_FOR_OPPONENT,
            }),
          );
        }
      }

      if (message.type == MOVE) {
        const game = this.games.find(
          (game) => game.player1 == socket || game.player2,
        );
        if (game) {
          game.makeMove(socket, message.payload.move); // This particular player is making a move
        }
      }
    });
  }
}
