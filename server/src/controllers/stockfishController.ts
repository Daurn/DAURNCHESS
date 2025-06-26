import { Chess } from "chess.js";
import { Request, Response } from "express";
import { getStockfishMove } from "../services/stockfishService";

// Stockage temporaire en mémoire (à remplacer par une vraie DB si besoin)
const games: Record<
  string,
  {
    fen: string;
    moves: string[];
    playerColor: "white" | "black";
    elo: number;
  }
> = {};

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const startBotGame = (req: Request, res: Response) => {
  const { playerColor = "white", elo = 1500 } = req.body;
  const id = Math.random().toString(36).slice(2, 10);
  games[id] = {
    fen: START_FEN,
    moves: [],
    playerColor,
    elo,
  };
  res.json({ gameId: id, fen: START_FEN, playerColor, elo });
};

export const playUserMove = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  const { move } = req.body;
  const game = games[gameId];
  if (!game) return res.status(404).json({ error: "Partie non trouvée" });
  // Appliquer le coup utilisateur (utiliser chess.js pour valider et générer le nouveau FEN)
  try {
    const chess = new Chess(game.fen);
    const moveResult = chess.move(move);
    if (!moveResult) return res.status(400).json({ error: "Coup illégal" });
    game.fen = chess.fen();
    game.moves.push(move.san || move.from + move.to + (move.promotion || ""));
    // Si la partie n'est pas finie, le bot joue
    if (!chess.isGameOver()) {
      const botMoveUci = await getStockfishMove(game.fen, { elo: game.elo });
      chess.move({
        from: botMoveUci.slice(0, 2),
        to: botMoveUci.slice(2, 4),
        promotion: botMoveUci.slice(4),
      });
      game.fen = chess.fen();
      game.moves.push(botMoveUci);
    }
    res.json({
      fen: game.fen,
      moves: game.moves,
      gameOver: chess.isGameOver(),
    });
  } catch (e) {
    res.status(500).json({
      error: "Erreur lors du traitement du coup",
      details:
        typeof e === "object" && e !== null && "message" in e
          ? (e as any).message
          : String(e),
    });
  }
};

export const getBotGame = (req: Request, res: Response) => {
  const { gameId } = req.params;
  const game = games[gameId];
  if (!game) return res.status(404).json({ error: "Partie non trouvée" });
  res.json({
    fen: game.fen,
    moves: game.moves,
    playerColor: game.playerColor,
    elo: game.elo,
  });
};
