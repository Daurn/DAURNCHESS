import { Router } from "express";
import {
  createGame,
  getGameHistory,
  getGames,
  playMove,
  playVsRobot,
  updateGameStatus,
} from "../controllers/gameController";
import { validateRequest } from "../middleware/validateRequest";
import { createGameSchema, moveSchema } from "../validators/game";

const router = Router();

router.post("/", validateRequest(createGameSchema), createGame); // POST /games
router.get("/", getGames); // GET /games/
router.post("/:id/move", validateRequest(moveSchema), playMove); // POST /games/:gameId/move
router.get("/:gameId/history", getGameHistory); // GET /games/:gameId/history
router.post("/:id/robot-move", playVsRobot);
router.patch("/:id/status", updateGameStatus);

export default router;
