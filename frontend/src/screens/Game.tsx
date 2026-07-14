import { useEffect, useState } from "react";
import Chessboard from "../components/Chessboard";
import Button from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { toast, ToastContainer } from "react-toastify";
import { PacmanLoader, RingLoader } from "react-spinners";

// Move everything together, there is a code repetition
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const INVALID_MOVE = "invalid_move";
export const WAITING_FOR_OPPONENT = "waiting_for_opponent";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("");

  const notify = () => toast("Invalid Move");
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message received from server: ", message);
      switch (message.type) {
        case WAITING_FOR_OPPONENT:
          setStatus(
            "Wait for a few seconds... We are connecting to another player.",
          );

          break;
        case INIT_GAME:
          setBoard(chess.board());

          setStatus(
            "Game started! You are playing as " + message.payload.color,
          );
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
  if (!socket)
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#5ff70c" />
      </div>
    );
  if (!started)
    return (
      <div className="flex justify-center flex-col items-center h-screen">
        <div className="text-white text-4xl">{status}</div>
        <RingLoader color="#5ff70c" />
      </div>
    );
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
