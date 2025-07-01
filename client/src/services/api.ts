import type { Game, Move } from "@/types/game";

export const getGame = async (gameId: string): Promise<Game> => {
  const res = await fetch(`/api/games/${gameId}`);
  if (!res.ok) throw new Error("Erreur lors de la récupération de la partie");
  return res.json();
};

export const updateGameStatus = async (
  gameId: string,
  status: "FINISHED" | "ABANDONED",
  winnerId?: string
) => {
  const res = await fetch(`/api/games/${gameId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, winnerId }),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut");
  return res.json();
};

export const getStockfishMove = async (fen: string, skillLevel = 1) => {
  const response = await fetch("/api/stockfish-move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fen, skillLevel }),
  });
  if (!response.ok) throw new Error("Erreur lors de la requête à Stockfish");
  const data = await response.json();
  return data.move; // exemple : 'e7e5'
};

export const getGameMoves = async (gameId: string): Promise<Move[]> => {
  const res = await fetch(`/api/games/${gameId}/moves`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des coups");
  return res.json();
};

export const postGameMove = async (
  gameId: string,
  move: string,
  playerId?: string
): Promise<Move> => {
  const res = await fetch(`/api/games/${gameId}/moves`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ move, playerId }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'envoi du coup");
  return res.json();
};
