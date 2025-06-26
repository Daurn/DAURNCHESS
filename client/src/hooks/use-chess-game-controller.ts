import { Chess } from "chess.js";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChessMove } from "../types/game";

export type UseChessGameControllerProps = {
  elo: string;
  initialColor: string;
  gameId?: string;
};

export const useChessGameController = ({
  elo,
  initialColor,
  gameId,
}: UseChessGameControllerProps) => {
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
      return false;
    }
    const previousFen = fen;
    setFen(gameCopy.fen());
    setGame(gameCopy);
    makeMove(move, previousFen);
    return true;
  };

  const resetGame = () => {
    console.log("Fonctionnalité de réinitialisation à implémenter.");
  };

  return {
    fen,
    gameOver,
    result,
    isChatVisible,
    setIsChatVisible,
    boardWidth,
    boardContainerRef,
    playerColor,
    isLoading,
    isDraggablePiece,
    onDrop,
    resetGame,
    elo,
    initialColor,
  };
};
