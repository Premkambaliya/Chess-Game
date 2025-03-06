import React, { useState, useCallback } from "react";
import { Chess } from "chess.js";
import ChessboardUI from "./Chessboard.jsx";
import { RotateCcw } from "lucide-react";

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState("");
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
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
      } catch (e) {
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
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(255,0,0,.3) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });

    newSquares[square] = { background: "rgba(255, 255, 0, 0.4)" };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square) {
    setRightClickedSquares({});
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

  function onSquareRightClick(square) {
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]: { backgroundColor: "rgba(0, 0, 255, 0.4)" },
    });
  }

  function resetGame() {
    setGame(new Chess());
    setMoveFrom("");
    setRightClickedSquares({});
    setMoveSquares({});
    setOptionSquares({});
    setMessage("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {message && (
        <div className="absolute top-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md text-lg font-semibold animate-bounce">
          {message}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">♟️ Chess Game</h1>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        <div className="flex justify-center">
          <ChessboardUI
            game={game}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            customSquareStyles={{
              ...moveSquares,
              ...optionSquares,
              ...rightClickedSquares,
            }}
          />
        </div>

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

export default ChessGame;
