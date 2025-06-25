import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createGame = async (req: Request, res: Response) => {
  try {
    const { whiteId, blackId } = req.body;

    const game = await prisma.game.create({
      data: {
        whiteId,
        blackId,
        status: "WAITING",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        moves: [],
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

export const getGame = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        white: { select: { username: true } },
        black: { select: { username: true } },
        winner: { select: { username: true } },
        messages: true,
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
    const games = await prisma.games.findMany({
      include: {
        white_user: true,
        black_user: true,
        moves: true,
      },
    });

    res.status(200).json(games);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des parties" });
  }
};

export const playMove = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { from, to, promotion } = req.body;

    const game = await prisma.game.findUnique({ where: { id } });
    if (!game) {
      return res.status(404).json({
        status: "error",
        message: "Game not found",
      });
    }
    if (game.status !== "PLAYING") {
      return res.status(400).json({
        status: "error",
        message: "Game is not in playing state",
      });
    }

    // Ici, il faudrait valider le coup avec une lib d'échecs (TODO)
    const moveStr = `${from}${to}${promotion || ""}`;
    const updatedGame = await prisma.game.update({
      where: { id },
      data: {
        moves: [...game.moves, moveStr],
        // TODO: mettre à jour le FEN et le statut si besoin
      },
    });

    return res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Play move error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getGameHistory = (req: Request, res: Response) => {
  const { gameId } = req.params;
  res.status(200).json({ gameId, history: ["move1", "move2"] });
};
