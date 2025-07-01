import { z } from "zod";

export const moveSchema = z.object({
  from: z.string().length(2),
  to: z.string().length(2),
  promotion: z.string().optional(),
});

export const createGameSchema = z.object({
  body: z.object({
    whiteId: z.string().nullable(),
    blackId: z.string().nullable(),
    isBotGame: z.boolean().optional(),
  }),
});

export const moveToGameSchema = z.object({
  body: z.object({
    move: z.string().min(1),
    playerId: z.string().optional(),
  }),
});

export type MoveInput = z.infer<typeof moveSchema>;
export type CreateGameInput = z.infer<typeof createGameSchema>["body"];
