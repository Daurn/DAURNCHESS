import { Button } from "@mui/material";
import { Chess } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import type { ChessMove } from "../../types";

export const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");

  const makeMove = (move: ChessMove) => {
    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        return true;
      }
    } catch (error) {
      console.error("Error making move:", error);
      return false;
    }
    return false;
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move: ChessMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    };
    return makeMove(move);
  };

  return (
    <div className="flex h-screen p-4 gap-4 box-border">
      <div className="w-[60%] flex-col justify-center items-center bg-gray-100 rounded-xl shadow-lg">
        <Chessboard position={fen} onPieceDrop={onDrop} boardWidth={700} />

        {gameOver && <div className="text-lg font-bold">{result}</div>}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const newGame = new Chess();
            setGame(newGame);
            setFen(newGame.fen());
            setGameOver(false);
            setResult("");
          }}
        >
          Nouvelle Partie
        </Button>
      </div>
      <div className="w-[40%] bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Informations</h2>
          <p>Ici : timer, joueur, score, etc.</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Chat</h2>
          <div className="border h-64 p-2 rounded overflow-y-auto bg-gray-50">
            <p>(Messages ici)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
