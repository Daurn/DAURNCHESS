export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
};

export type Game = {
  id: string;
  whiteId: string;
  blackId: string;
  fen: string;
  status: GameStatus;
  moves: string[];
  winnerId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GameStatus = "WAITING" | "PLAYING" | "FINISHED" | "ABANDONED";

export type Move = {
  from: string;
  to: string;
  promotion?: string;
};
