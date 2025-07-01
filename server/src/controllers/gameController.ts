import { GameStatus, PrismaClient } from "@prisma/client";
import { Chess } from "chess.js";
import { Request, Response } from "express";
import { getStockfishMove } from "../services/stockfishService";

const prisma = new PrismaClient();

export const createGame = async (req: Request, res: Response) => {
  try {
    const { whiteId, blackId, isBotGame, elo } = req.body;
    let eloValue: number | null = null;
    if (isBotGame) {
      eloValue = typeof elo === "number" ? elo : 1500;
    } else {
      // On récupère le rating de l'adversaire (celui qui n'est pas le créateur)
      // On suppose que le créateur est whiteId
      const adversaireId = blackId;
      const adversaire = await prisma.user.findUnique({
        where: { id: adversaireId },
      });
      eloValue = adversaire?.rating ?? null;
    }
    const game = await prisma.game.create({
      data: {
        whiteId,
        blackId,
        isBotGame,
        status: "WAITING",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        elo: eloValue,
      },
    });
    return res.status(201).json(game);
  } catch (error) {
    console.error("Create game error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getGameById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        white: { select: { username: true } },
        black: { select: { username: true } },
        winner: { select: { username: true } },
        messages: true,
        Move: {
          orderBy: {
            number: "asc",
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({
        status: "error",
        message: "Game not found",
      });
    }

    return res.status(200).json(game);
  } catch (error) {
    console.error("Get game error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getGames = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const where = status ? { status: status as GameStatus } : undefined;
    const games = await prisma.game.findMany({
      where,
      include: {
        white: true,
        black: true,
      },
    });
    res.status(200).json(games);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des parties" });
  }
};

export const playVsRobot = async (
  req: Request<{ gameId: string }>,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const { elo = 1500 } = req.body;
    let game = await prisma.game.findUnique({ where: { id: gameId } });
    if (!game) {
      return res
        .status(404)
        .json({ status: "error", message: "Game not found" });
    }
    if (game.status === "WAITING") {
      game = await prisma.game.update({
        where: { id: gameId },
        data: { status: "PLAYING" },
      });
    } else if (game.status !== "PLAYING") {
      return res
        .status(400)
        .json({ status: "error", message: "Game is not in playing state" });
    }
    // Le robot joue le coup
    const bestMove = await getStockfishMove(game.fen, { elo });

    const chess = new Chess(game.fen);
    const moveResult = chess.move(bestMove);

    if (moveResult === null) {
      return res.status(500).json({
        status: "error",
        message: "Stockfish a produit un coup invalide.",
      });
    }

    const updatedFen = chess.fen();
    const movesCount = await prisma.move.count({ where: { gameId: gameId } });

    const [, newMove] = await prisma.$transaction([
      prisma.game.update({
        where: { id: gameId },
        data: { fen: updatedFen },
      }),
      prisma.move.create({
        data: {
          gameId,
          move: bestMove,
          number: movesCount + 1,
          // Le robot n'a pas de playerId pour l'instant
        },
      }),
    ]);

    return res.status(200).json({ fen: updatedFen, move: newMove });
  } catch (error) {
    console.error("Play vs robot error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const updateGameStatus = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status, winnerId } = req.body;

    if (!status && !winnerId) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing status or winnerId" });
    }

    const dataToUpdate: { status?: GameStatus; winnerId?: string } = {};
    if (status) dataToUpdate.status = status;
    if (winnerId) dataToUpdate.winnerId = winnerId;

    const game = await prisma.game.update({
      where: { id },
      data: dataToUpdate,
    });
    return res.status(200).json(game);
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

// Ajoute un coup à une partie
export const addMoveToGame = async (
  req: Request<{ gameId: string }, {}, { move: string; playerId?: string }>,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const { move, playerId } = req.body;
    if (!move) return res.status(400).json({ error: "Move requis" });

    const game = await prisma.game.findUnique({ where: { id: gameId } });
    if (!game) {
      return res.status(404).json({ error: "Partie non trouvée" });
    }

    const chess = new Chess(game.fen);
    const moveResult = chess.move(move);

    if (moveResult === null) {
      return res.status(400).json({ error: "Coup invalide" });
    }

    const movesCount = await prisma.move.count({ where: { gameId } });

    const [, newMove] = await prisma.$transaction([
      prisma.game.update({
        where: { id: gameId },
        data: { fen: chess.fen() },
      }),
      prisma.move.create({
        data: {
          gameId,
          playerId,
          move,
          number: movesCount + 1,
        },
      }),
    ]);

    return res.status(201).json(newMove);
  } catch (error) {
    console.error("Erreur lors de l'ajout du coup:", error);
    return res.status(500).json({ error: "Erreur lors de l'ajout du coup" });
  }
};

// Récupère l'historique des coups d'une partie
export const getMovesForGame = async (
  req: Request<{ gameId: string }>,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const moves = await prisma.move.findMany({
      where: { gameId },
      orderBy: { number: "asc" },
      include: { player: { select: { id: true, username: true } } },
    });
    return res.status(200).json(moves);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération des coups" });
  }
};
