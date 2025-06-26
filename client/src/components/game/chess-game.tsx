import { Chess } from "chess.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { cn } from "../../lib/utils";
import type { ChessMove } from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type Props = {
  elo: string;
  initialColor: string;
  gameId?: string;
};

export const ChessGame = ({ elo, initialColor, gameId }: Props) => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [boardWidth, setBoardWidth] = useState(700);
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [playerColor, setPlayerColor] = useState<"white" | "black">("white");
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour autoriser le drag uniquement sur les pièces du joueur
  const isDraggablePiece = ({ piece }: { piece: string }) => {
    if (isLoading || gameOver) return false;
    if (!piece) return false;
    const isPlayerTurn =
      (playerColor === "white" && game.turn() === "w") ||
      (playerColor === "black" && game.turn() === "b");
    if (!isPlayerTurn) return false;
    // Les pièces blanches commencent par 'w', les noires par 'b'
    if (playerColor === "white") return piece.startsWith("w");
    return piece.startsWith("b");
  };

  useEffect(() => {
    const updateBoardWidth = () => {
      if (boardContainerRef.current) {
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

  const loadGame = useCallback(async () => {
    if (!gameId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/stockfish/${gameId}`);
      if (!res.ok) throw new Error("Partie non trouvée");
      const data = await res.json();
      const gameCopy = new Chess(data.fen);
      setGame(gameCopy);
      setFen(data.fen);
      setPlayerColor(data.playerColor);

      if (
        (data.playerColor === "white" && gameCopy.turn() === "b") ||
        (data.playerColor === "black" && gameCopy.turn() === "w")
      ) {
        // on assume que le back a déjà fait jouer le bot si nécessaire
        // ou on pourrait appeler une route pour le faire jouer
      }
    } catch (e) {
      console.error("Erreur chargement partie:", e);
    } finally {
      setIsLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  const makeMove = async (move: ChessMove, previousFen: string) => {
    if (gameOver || !gameId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/stockfish/${gameId}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ move }),
      });
      const data = await res.json();
      if (res.ok) {
        setFen(data.fen);
        const updatedGame = new Chess(data.fen);
        setGame(updatedGame);
        if (updatedGame.isGameOver()) {
          setGameOver(true);
          if (updatedGame.isCheckmate()) {
            setResult(
              `Mat ! ${
                updatedGame.turn() === "w" ? "Les noirs" : "Les blancs"
              } gagnent.`
            );
          } else if (updatedGame.isDraw()) {
            setResult("Match nul !");
          } else {
            setResult("Partie terminée");
          }
        }
      } else {
        throw new Error(data.error || "Coup invalide");
      }
    } catch (e) {
      console.error("Erreur lors du coup, annulation:", e);
      // Rollback to the state before the optimistic update
      setFen(previousFen);
      setGame(new Chess(previousFen));
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move: ChessMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    };

    const gameCopy = new Chess(fen);
    if (gameCopy.move(move) === null) {
      return false; // illegal move
    }

    const previousFen = fen;
    setFen(gameCopy.fen()); // optimistic update
    setGame(gameCopy);

    makeMove(move, previousFen);

    return true;
  };

  const resetGame = () => {
    console.log("Fonctionnalité de réinitialisation à implémenter.");
  };

  return (
    <div className="flex h-screen p-4 gap-4 box-border">
      <div
        className={cn(
          "flex flex-col transition-all duration-300 ease-in-out flex-1",
          isChatVisible ? "mr-8" : "items-start justify-center mr-0"
        )}
      >
        <Card className="mb-4">
          <CardContent className="p-2 text-sm text-muted-foreground">
            <div>Elo du robot : {elo}</div>
            <div>Couleur choisie : {initialColor}</div>
            <div>Votre couleur : {playerColor}</div>
          </CardContent>
        </Card>
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
                boardOrientation={playerColor}
                isDraggablePiece={isDraggablePiece}
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
        <Button onClick={resetGame} disabled>
          Nouvelle Partie
        </Button>
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
