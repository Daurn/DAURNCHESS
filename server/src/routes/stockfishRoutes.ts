import { Router } from "express";
import {
  getBotGame,
  playUserMove,
  startBotGame,
} from "../controllers/stockfishController";
import { getStockfishMove } from "../services/stockfishService";

const router = Router();

router.post("/bestmove", async (req, res) => {
  const { fen, elo, movetime } = req.body;
  if (!fen) return res.status(400).json({ error: "FEN manquant" });
  try {
    const bestmove = await getStockfishMove(fen, { elo, movetime });
    res.json({ bestmove });
  } catch (e) {
    res.status(500).json({ error: "Erreur Stockfish" });
  }
});

// Nouvelle partie contre le bot
router.post("/start", startBotGame);
// Jouer un coup utilisateur
router.post("/:gameId/move", playUserMove);
// Obtenir l'état courant
router.get("/:gameId", getBotGame);

export default router;
