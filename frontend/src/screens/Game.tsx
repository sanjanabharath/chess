import React, { useEffect, useState } from "react";
import Chessboard from "../components/Chessboard";
import Button from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { toast, ToastContainer } from "react-toastify";

// Move everything together, there is a code repetition
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const INVALID_MOVE = "invalid_move";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const notify = () => toast("Invalid Move");
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message received from server: ", message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          console.log("Game initialized..");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
        case INVALID_MOVE:
          <div>
            <button onClick={notify}>Invalid Move</button>
            <ToastContainer />
          </div>;
          break;
      }
    };
  }, [socket]);
  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 w-full">
            <Chessboard
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
            />
          </div>
          <div className="col-span-2">
            {!started && (
              <Button
                onClick={() => {
                  socket.send(JSON.stringify({ type: INIT_GAME }));
                }}
              >
                Play
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
