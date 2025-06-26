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
