import React, { useState, useCallback } from "react";
import { Chess } from "chess.js";
import ChessboardUI from "./Chessboard";
import { RotateCcw } from "lucide-react";

const App = () => {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});
  const [message, setMessage] = useState("");

  const makeAMove = useCallback(
    (move) => {
      try {
        const result = game.move(move);
        setGame(new Chess(game.fen()));

        if (game.isCheck()) {
          setMessage("⚠️ Check!");
          setTimeout(() => setMessage(""), 2000);
        }

        if (game.isGameOver()) {
          setMessage(
            game.isCheckmate()
              ? `🏆 ${game.turn() === "w" ? "Black" : "White"} wins by checkmate!`
              : game.isDraw()
              ? "⚖️ Draw!"
              : "Game Over!"
          );
        }

        return result;
      } catch {
        return null;
      }
    },
    [game]
  );

  function getMoveOptions(square) {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background: "radial-gradient(circle, rgba(255,255,0,.3) 60%, transparent 60%)",
        borderRadius: "50%",
      };
    });

    newSquares[square] = { background: "rgba(0, 255, 255, 0.4)" };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    if (!moveFrom) {
      if (getMoveOptions(square)) setMoveFrom(square);
      return;
    }

    const move = makeAMove({ from: moveFrom, to: square, promotion: "q" });
    if (!move) {
      if (getMoveOptions(square)) setMoveFrom(square);
    } else {
      setMoveFrom("");
      setOptionSquares({});
    }
  }

  function resetGame() {
    setGame(new Chess());
    setMoveFrom("");
    setOptionSquares({});
    setMessage("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="absolute top-4 text-xl">{message}</div>

      <div className="w-full max-w-screen-sm">
        <div className="flex justify-between items-center mb-4 px-4">
          <h1 className="text-2xl font-bold">♟️ Chess Game</h1>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        <ChessboardUI
          game={game}
          onSquareClick={onSquareClick}
          customSquareStyles={optionSquares}
        />

        <div className="mt-4 text-center text-lg font-semibold">
          {game.isGameOver() ? (
            <span className="text-green-400">{message}</span>
          ) : (
            <span>Current Turn: {game.turn() === "w" ? "White" : "Black"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
