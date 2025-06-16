import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const createGame = async (req: Request, res: Response) => {
  try {
    const { white_user_id, black_user_id } = req.body;

    const newGame = await prisma.games.create({
      data: {
        white_user_id,
        black_user_id,
      },
    });

    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création de la partie" });
  }
};

export const getGame = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  try {
    const game = await prisma.games.findUnique({
      where: { id: Number(gameId) },
      include: {
        white_user: true,
        black_user: true,
        moves: true,
      },
    });

    if (!game) return res.status(404).json({ error: "Partie non trouvée" });

    res.status(200).json(game);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la partie" });
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

export const playMove = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  const { from_square, to_square, piece, promotion, fen_before } = req.body;

  try {
    const moveCount = await prisma.move.count({
      where: { game_id: Number(gameId) },
    });

    const move = await prisma.move.create({
      data: {
        game_id: Number(gameId),
        from_square,
        to_square,
        piece,
        promotion,
        fen_before,
        move_number: moveCount + 1,
      },
    });

    res.status(201).json(move);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout du coup" });
  }
};

export const getGameHistory = (req: Request, res: Response) => {
  const { gameId } = req.params;
  res.status(200).json({ gameId, history: ["move1", "move2"] });
};