import React from "react";
import { Chessboard } from "react-chessboard";

const ChessboardUI = ({ game, onSquareClick, onSquareRightClick, customSquareStyles }) => {
  return (
    <div className="ml-500">
      <div className="flex justify-center items-center h-screen w-screen bg-gray-900">
        <div className="w-[400px] h-[400px] flex justify-center items-center">
          <Chessboard
            position={game.fen()}
            onPieceDrop={(source, target) => onSquareClick(target)}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            customSquareStyles={customSquareStyles}
            boardStyle={{
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
    /* <div className="flex justify-center items-center h-screen w-screen bg-gray-900">
      <div className="w-[400px] h-[400px]">
        <Chessboard
          position={game.fen()}
          onPieceDrop={(source, target) => onSquareClick(target)}
         onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          customSquareStyles={customSquareStyles}
          boardStyle={{
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            width: "100%",
            height: "100%",
            margin: "0 auto",
          }}
        />
      </div>
    </div> */
  );
};

export default ChessboardUI;
