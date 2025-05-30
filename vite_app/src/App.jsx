// import React, { useEffect, useState } from "react";
// import { Chess } from "chess.js";

// const pieceImages = {
//   wP: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/68px-Chess_plt45.svg.png",
//   wR: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/68px-Chess_rlt45.svg.png",
//   wN: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/68px-Chess_nlt45.svg.png",
//   wB: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/68px-Chess_blt45.svg.png",
//   wQ: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/68px-Chess_qlt45.svg.png",
//   wK: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/68px-Chess_klt45.svg.png",
//   bP: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/68px-Chess_pdt45.svg.png",
//   bR: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/68px-Chess_rdt45.svg.png",
//   bN: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/68px-Chess_ndt45.svg.png",
//   bB: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/68px-Chess_bdt45.svg.png",
//   bQ: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/68px-Chess_qdt45.svg.png",
//   bK: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/68px-Chess_kdt45.svg.png",
// };

// const App = () => {
//   const [game, setGame] = useState(new Chess());
//   const [turn, setTurn] = useState("white");
//   const [selected, setSelected] = useState(null);
//   const [highlightSquares, setHighlightSquares] = useState([]);
//   const [message, setMessage] = useState("");
//   const [whiteTime, setWhiteTime] = useState(600);
//   const [blackTime, setBlackTime] = useState(600);

//   const board = game.board();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (game.isGameOver()) return;
//       if (turn === "white") setWhiteTime((t) => Math.max(0, t - 1));
//       else setBlackTime((t) => Math.max(0, t - 1));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [turn, game]);

//   useEffect(() => {
//     if (game.isCheckmate()) {
//       setMessage(`${turn === "white" ? "Black" : "White"} wins by checkmate!`);
//     } else if (game.isCheck()) {
//       setMessage("Check!");
//       setTimeout(() => setMessage(""), 2000);
//     }
//   }, [game]);

//   const handleMove = (from, to) => {
//     const move = game.move({ from, to, promotion: "q" });
//     if (move) {
//       setGame(new Chess(game.fen()));
//       setTurn(game.turn() === "w" ? "white" : "black");
//       setHighlightSquares([]);
//       return true;
//     }
//     return false;
//   };

//   const handleClick = (i, j) => {
//     const square = `${"abcdefgh"[j]}${8 - i}`;
//     const piece = game.get(square);

//     if (selected) {
//       if (!handleMove(selected, square)) {
//         if (piece && piece.color === game.turn()) {
//           setSelected(square);
//           setHighlightSquares(getMoveSquares(square));
//         } else {
//           setSelected(null);
//           setHighlightSquares([]);
//         }
//       } else {
//         setSelected(null);
//       }
//     } else if (piece && piece.color === game.turn()) {
//       setSelected(square);
//       setHighlightSquares(getMoveSquares(square));
//     }
//   };

//   const getMoveSquares = (square) => {
//     return game
//       .moves({ square, verbose: true })
//       .map((m) => ({
//         square: m.to,
//         isCapture: m.flags.includes("c"),
//       }));
//   };

//   const formatTime = (time) => {
//     const mins = Math.floor(time / 60);
//     const secs = time % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const resetGame = () => {
//     const newGame = new Chess();
//     setGame(newGame);
//     setTurn("white");
//     setSelected(null);
//     setHighlightSquares([]);
//     setMessage("");
//     setWhiteTime(600);
//     setBlackTime(600);
//   };

//   const getSquareStyle = (i, j) => {
//     const square = `${"abcdefgh"[j]}${8 - i}`;
//     let background = (i + j) % 2 === 0 ? "#f0d9b5" : "#b58863";

//     if (selected === square) background = "#f1e05a"; // yellow for selected
//     highlightSquares.forEach(({ square: s, isCapture }) => {
//       if (s === square) background = isCapture ? "#e74c3c" : "#f1e05a";
//     });

//     return background;
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100vw",
//         backgroundColor: "#1a1a1a",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "#fff",
//       }}
//     >
//       <button
//         onClick={resetGame}
//         style={{ position: "absolute", left: 40, top: 40, padding: "10px 20px", background: "#e74c3c", border: "none", borderRadius: 8, color: "white", cursor: "pointer" }}
//       >
//         Reset
//       </button>

//       <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(8, 60px)",
//             gridTemplateRows: "repeat(8, 60px)",
//             border: "4px solid #333",
//           }}
//         >
//           {board.map((row, i) =>
//             row.map((square, j) => {
//               const piece = square ? `${square.color}${square.type.toUpperCase()}` : null;
//               return (
//                 <div
//                   key={`${i}-${j}`}
//                   onClick={() => handleClick(i, j)}
//                   style={{
//                     width: 60,
//                     height: 60,
//                     backgroundColor: getSquareStyle(i, j),
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {piece && (
//                     <img
//                       src={pieceImages[piece]}
//                       alt={piece}
//                       style={{ width: "90%", height: "90%", objectFit: "contain" }}
//                     />
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>

//         <div style={{ textAlign: "left", fontSize: 18 }}>
//           <p>White Time: {formatTime(whiteTime)}</p>
//           <p>Black Time: {formatTime(blackTime)}</p>
//         </div>
//       </div>

//       {message && (
//         <div
//           style={{
//             position: "absolute",
//             top: 20,
//             background: "#f39c12",
//             padding: "10px 20px",
//             borderRadius: 8,
//             fontWeight: "bold",
//           }}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState, useRef } from "react";
import { Chess } from "chess.js";

const pieceImages = {
  wP: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/68px-Chess_plt45.svg.png",
  wR: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/68px-Chess_rlt45.svg.png",
  wN: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/68px-Chess_nlt45.svg.png",
  wB: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/68px-Chess_blt45.svg.png",
  wQ: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/68px-Chess_qlt45.svg.png",
  wK: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/68px-Chess_klt45.svg.png",
  bP: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/68px-Chess_pdt45.svg.png",
  bR: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/68px-Chess_rdt45.svg.png",
  bN: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/68px-Chess_ndt45.svg.png",
  bB: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/68px-Chess_bdt45.svg.png",
  bQ: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/68px-Chess_qdt45.svg.png",
  bK: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/68px-Chess_kdt45.svg.png",
};

const App = () => {
  const [game, setGame] = useState(new Chess());
  const [turn, setTurn] = useState("white");
  const [selected, setSelected] = useState(null);
  const [highlightSquares, setHighlightSquares] = useState({});
  const [message, setMessage] = useState("");
  const [whiteTime, setWhiteTime] = useState(600); // 10 min
  const [blackTime, setBlackTime] = useState(600);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef(null);

  const board = game.board();

  useEffect(() => {
    if (game.isCheckmate()) {
      setMessage(`🏁 Checkmate! ${turn === "white" ? "Black" : "White"} wins!`);
      setIsRunning(false);
    } else if (game.isCheck()) {
      setMessage("⚠️ Check!");
    } else {
      setMessage("");
    }
  }, [game]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (turn === "white") {
        setWhiteTime((prev) => Math.max(prev - 1, 0));
      } else {
        setBlackTime((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [turn, isRunning]);

  const handleMove = (from, to) => {
    const move = game.move({ from, to, promotion: "q" });
    if (move) {
      setGame(new Chess(game.fen()));
      setTurn(game.turn() === "w" ? "white" : "black");
      setSelected(null);
      setHighlightSquares({});
    }
  };

  const handleClick = (i, j) => {
    const square = `${"abcdefgh"[j]}${8 - i}`;
    const piece = game.get(square);

    if (selected && selected !== square) {
      handleMove(selected, square);
    } else if (piece && piece.color === (turn === "white" ? "w" : "b")) {
      setSelected(square);
      highlightOptions(square);
    } else {
      setSelected(null);
      setHighlightSquares({});
    }
  };

  const highlightOptions = (square) => {
    const moves = game.moves({ square, verbose: true });
    const highlights = {};
    highlights[square] = "#ff0"; // Yellow for selected

    moves.forEach((move) => {
      highlights[move.to] = game.get(move.to) ? "#f00" : "#0f0"; // Red if capturable, green if empty
    });

    setHighlightSquares(highlights);
  };

  const getSquareColor = (i, j, square) => {
    if (highlightSquares[square]) return highlightSquares[square];

    return (i + j) % 2 === 0 ? "#f0d9b5" : "#b58863";
  };

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const resetGame = () => {
    setGame(new Chess());
    setTurn("white");
    setSelected(null);
    setHighlightSquares({});
    setMessage("");
    setWhiteTime(600);
    setBlackTime(600);
    setIsRunning(true);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>
        ♟️ Chess Game
      </h1>

      {message && (
        <div style={{ marginBottom: "10px", fontSize: "18px", color: "#ffc107" }}>
          {message}
        </div>
      )}

      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
        <div>
          <button
            onClick={resetGame}
            style={{
              marginBottom: "16px",
              padding: "10px 20px",
              backgroundColor: "#dc2626",
              border: "none",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🔁 Reset
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 60px)",
            gridTemplateRows: "repeat(8, 60px)",
            border: "4px solid #333",
          }}
        >
          {board.map((row, i) =>
            row.map((square, j) => {
              const squareKey = `${"abcdefgh"[j]}${8 - i}`;
              const piece = square
                ? `${square.color}${square.type.toUpperCase()}`
                : null;

              return (
                <div
                  key={`${i}-${j}`}
                  onClick={() => handleClick(i, j)}
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: getSquareColor(i, j, squareKey),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                >
                  {piece && (
                    <img
                      src={pieceImages[piece]}
                      alt={piece}
                      style={{ width: "90%", height: "90%", objectFit: "contain" }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            fontSize: "18px",
            alignItems: "center",
          }}
        >
          <div>
            ⬜ White Time: <strong>{formatTime(whiteTime)}</strong>
          </div>
          <div>
            ⬛ Black Time: <strong>{formatTime(blackTime)}</strong>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setIsRunning(false)}
              style={{
                padding: "6px 14px",
                backgroundColor: "#555",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              ⏸️ Stop
            </button>
            <button
              onClick={() => setIsRunning(true)}
              style={{
                padding: "6px 14px",
                backgroundColor: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              ▶️ Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
