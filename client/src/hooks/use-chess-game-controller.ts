import type { Move } from "@/types/game";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import { getGame, postGameMove } from "../services/api";

export type UseChessGameControllerProps = {
  gameId?: string;
  userId?: string;
};

export const useChessGameController = ({
  gameId,
  userId,
}: UseChessGameControllerProps) => {
  const [fen, setFen] = useState("start");
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [boardWidth, setBoardWidth] = useState(700);
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [playerColor, setPlayerColor] = useState<"white" | "black">("white");
  const [isLoading, setIsLoading] = useState(true);
  const [moves, setMoves] = useState<Move[]>([]);
  const [adversaireElo, setAdversaireElo] = useState<number | null>(null);

  useEffect(() => {
    if (!gameId || !userId) return;
    let isMounted = true;
    setIsLoading(true);
    getGame(gameId)
      .then((data) => {
        if (!isMounted) return;
        const color: "white" | "black" =
          userId === data.whiteId ? "white" : "black";
        setPlayerColor(color);
        setFen(data.fen);
        setMoves(data.moves);
        setAdversaireElo(data.elo ?? null);
        setGameOver(
          data.status === "FINISHED" || new Chess(data.fen).isGameOver()
        );
        setResult("");
      })
      .catch((e) => {
        console.error("Erreur chargement partie:", e);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [gameId, userId]);

  useEffect(() => {
    const updateBoardWidth = () => {
      if (boardContainerRef.current) {
        setBoardWidth(Math.min(boardContainerRef.current.offsetWidth, 700));
      }
    };
    updateBoardWidth();
    const resizeObserver = new window.ResizeObserver(updateBoardWidth);
    const boardContainer = boardContainerRef.current;
    if (boardContainer) resizeObserver.observe(boardContainer);
    window.addEventListener("resize", updateBoardWidth);
    return () => {
      window.removeEventListener("resize", updateBoardWidth);
      if (boardContainer) resizeObserver.unobserve(boardContainer);
      resizeObserver.disconnect();
    };
  }, [isChatVisible]);

  useEffect(() => {
    if (gameOver || isLoading || !gameId) return;
    const chess = new Chess(fen);
    const isBotTurn =
      (playerColor === "white" && chess.turn() === "b") ||
      (playerColor === "black" && chess.turn() === "w");
    if (isBotTurn) {
      setIsLoading(true);
      fetch(`/api/games/${gameId}/botmove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setFen(data.fen);
        })
        .catch((e) => {
          console.error("Erreur lors du coup du bot:", e);
        })
        .finally(() => setIsLoading(false));
    }
  }, [fen, playerColor, gameOver, isLoading, gameId]);

  const isDraggablePiece = ({ piece }: { piece: string }) => {
    if (isLoading || gameOver) return false;
    const chess = new Chess(fen);
    const isPlayerTurn =
      (playerColor === "white" && chess.turn() === "w") ||
      (playerColor === "black" && chess.turn() === "b");
    return isPlayerTurn && piece.startsWith(playerColor[0]);
  };

  const onDrop = async (sourceSquare: string, targetSquare: string) => {
    if (!gameId) return false;
    const chess = new Chess(fen);
    const move = chess.move({ from: sourceSquare, to: targetSquare });
    if (!move) return false;
    setFen(chess.fen());
    setIsLoading(true);
    try {
      await postGameMove(gameId, move.san, userId);
      const data = await getGame(gameId);
      setMoves(data.moves);
      setFen(data.fen);
      setGameOver(
        data.status === "FINISHED" || new Chess(data.fen).isGameOver()
      );
    } catch (e) {
      console.error("Erreur lors de l'enregistrement du coup:", e);
      setFen(fen);
      return false;
    } finally {
      setIsLoading(false);
    }
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
    adversaireElo,
    moves,
  };
};
