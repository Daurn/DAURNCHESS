import { Router } from "express";
import {
  createGame,
  getGame,
  getGames,
  playMove,
  getGameHistory,
} from "../controllers/gameController";

const router = Router();

router.post("/", createGame); // POST /games
router.get("/games", getGames); // GET /games/games
router.post("/:gameId/move", playMove); // POST /games/:gameId/move
router.get("/:gameId/history", getGameHistory); // GET /games/:gameId/history

export default router;
