import { Router } from "express";
import {
  addMoveToGame,
  createGame,
  getGameById,
  getGames,
  getMovesForGame,
  playVsRobot,
  updateGameStatus,
} from "../controllers/gameController";
import { validateRequest } from "../middleware/validateRequest";
import { createGameSchema, moveToGameSchema } from "../validators/game";

const router = Router();

router.post("/", validateRequest(createGameSchema), createGame); // POST /games
router.get("/", getGames); // GET /games/
router.get("/:id", getGameById);
router.post("/:gameId/botmove", playVsRobot);
router.patch("/:id/status", updateGameStatus);
router.post("/:gameId/moves", validateRequest(moveToGameSchema), addMoveToGame); // Ajout d'un coup à une partie
router.get("/:gameId/moves", getMovesForGame); // Récupération de l'historique des coups

export default router;
