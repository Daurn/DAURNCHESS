import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // source d'erreur :
    await prisma.user.findUnique({ where: { email } }).then(
      (user) => {if (user) {
        return res.status(400).json({ error: "Email déjà utilisé" });
      }}
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({
        message: "Utilisateur créé",
        user: { id: user.id, email: user.email, username: user.username },
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(userId) },
    });

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};