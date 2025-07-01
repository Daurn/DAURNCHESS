export type ChessMove = {
  from: string;
  to: string;
  promotion?: string;
};

export type GameState = {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  fen: string;
  status: GameStatus;
  turn: "w" | "b";
  moves: string[];
  timeControl: TimeControl;
};

export type TimeControl = {
  initial: number; // Temps initial en secondes
  increment: number; // Incrément en secondes
};

export type GameStatus = "waiting" | "playing" | "finished";

export type GameResult = {
  id: number;
  opponent: string;
  startTime: string;
  endTime: string;
  timeControl: string;
  result: string;
};

export type MatchmakingStatus = {
  status: "searching" | "found" | "cancelled" | "error";
  gameId?: string;
};

export type Move = {
  id: string;
  gameId: string;
  playerId?: string;
  move: string;
  number: number;
  createdAt: string;
  player?: { id: string; username: string };
};

export type Game = {
  id: string;
  whiteId: string;
  blackId: string;
  winnerId?: string;
  status: "WAITING" | "PLAYING" | "FINISHED" | "ABANDONED";
  fen: string;
  moves: Move[];
  createdAt: string;
  updatedAt: string;
  isBotGame: boolean;
  white: { username: string; rating: number };
  black: { username: string; rating: number };
  winner?: { username: string };
  elo?: number;
};
