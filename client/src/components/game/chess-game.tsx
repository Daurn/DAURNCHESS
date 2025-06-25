import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { cn } from "../../lib/utils";
import type { ChessMove } from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [boardWidth, setBoardWidth] = useState(700);
  const boardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBoardWidth = () => {
      if (boardContainerRef.current) {
        // On laisse un peu de marge pour le padding
        setBoardWidth(Math.min(boardContainerRef.current.offsetWidth, 700));
      }
    };
    updateBoardWidth();
    const resizeObserver = new window.ResizeObserver(updateBoardWidth);
    if (boardContainerRef.current) {
      resizeObserver.observe(boardContainerRef.current);
    }
    window.addEventListener("resize", updateBoardWidth);
    return () => {
      window.removeEventListener("resize", updateBoardWidth);
      if (boardContainerRef.current) {
        resizeObserver.unobserve(boardContainerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isChatVisible]);

  const makeMove = (move: ChessMove) => {
    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        setFen(gameCopy.fen());
        if (gameCopy.isGameOver()) {
          setGameOver(true);
          // TODO: Determine the game result message
          if (gameCopy.isCheckmate()) {
            setResult(
              `Checkmate! ${gameCopy.turn() === "w" ? "Black" : "White"} wins.`
            );
          } else if (gameCopy.isDraw()) {
            setResult("Draw!");
          } else {
            setResult("Game over");
          }
        }
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

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setGameOver(false);
    setResult("");
  };

  return (
    <div className="flex h-screen p-4 gap-4 box-border">
      <div
        className={cn(
          "flex flex-col transition-all duration-300 ease-in-out flex-1",
          isChatVisible ? "mr-8" : "items-start justify-center mr-0"
        )}
      >
        <Card>
          <CardContent className="p-6 flex items-center justify-center">
            <div
              ref={boardContainerRef}
              className="w-full flex justify-center items-center"
            >
              <Chessboard
                position={fen}
                onPieceDrop={onDrop}
                boardWidth={boardWidth}
              />
            </div>
          </CardContent>
        </Card>
        {gameOver && (
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold">{result}</p>
            </CardContent>
          </Card>
        )}
        <Button onClick={resetGame}>Nouvelle Partie</Button>
      </div>

      <div
        className={cn(
          "flex flex-col transition-all duration-300 ease-in-out",
          isChatVisible ? "w-[40%]" : "w-0 opacity-0"
        )}
      >
        <Card className={cn("flex flex-col", !isChatVisible && "invisible")}>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Ici : timer, joueur, score, etc.</p>
          </CardContent>
          <Separator />
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chat</h2>
            </div>
            <div className="border h-64 p-2 rounded overflow-y-auto bg-background">
              <p>(Messages ici)</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed top-4 right-4">
        <Button
          onClick={() => setIsChatVisible(!isChatVisible)}
          variant="outline"
          size="sm"
        >
          {isChatVisible ? "Cacher le chat" : "Afficher le chat"}
        </Button>
      </div>
    </div>
  );
};
