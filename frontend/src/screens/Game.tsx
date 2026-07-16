import { useEffect, useState } from "react";
import Chessboard from "../components/Chessboard";
import Button from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { toast, ToastContainer } from "react-toastify";
import { PacmanLoader, RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Move everything together, there is a code repetition
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const INVALID_MOVE = "invalid_move";
export const WAITING_FOR_OPPONENT = "waiting_for_opponent";

const Game = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const { token } = useAuth();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("");
  const [waiting, setWaiting] = useState(false);

  const notify = () => toast("Invalid Move");
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message received from server: ", message);
      switch (message.type) {
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
        case WAITING_FOR_OPPONENT:
          setStatus(
            "Wait for a few seconds... We are connecting to another player.",
          );
          setWaiting(true);
          console.log("Waiting for opponent...");
          break;
      }
    };
  }, [socket]);
  if (!token) {
    navigate("/signin");
  }
  if (!socket)
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#5ff70c" />
      </div>
    );
  if (!started && waiting)
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#5ff70c" />
        <p className="text-white text-lg ml-4">{status}</p>
      </div>
    );
  if (!started && !waiting)
    return (
      <div className="flex items-center justify-center h-screen">
        <Button
          className="px-6 py-3"
          onClick={() => {
            socket.send(JSON.stringify({ type: INIT_GAME }));
          }}
        >
          Start Game
        </Button>
      </div>
    );
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3 w-full">
            <Chessboard
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
            />
          </div>
          <div className="col-span-3">
            <Button
              className="px-6 py-3"
              onClick={() => {
                socket.close();
                socket.send(JSON.stringify({ type: GAME_OVER }));
                navigate("/");
              }}
            >
              End Game
            </Button>
            <div className="text-white mt-4 text-3xl">{status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
