import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

const Chessboard = ({
  chess,
  setBoard,
  board,
  socket,
}: {
  chess: any;
  setBoard: (board: any) => void;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);

  return (
    <div className="text-white-200">
      <div>
        {board.map((row, i) => (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRep = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRep);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRep,
                            },
                          },
                        }),
                      );
                      setFrom(null);
                      chess.move({ from, to: squareRep });
                      setBoard(chess.board());
                      console.log({ from, to: squareRep });
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${(i + j) % 2 === 0 ? "bg-lime-100" : "bg-green-500"}`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {/* {square ? square.type : ""} */}
                      {square ? (
                        <img
                          className="w-8 h-8 cursor-pointer"
                          src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chessboard;
