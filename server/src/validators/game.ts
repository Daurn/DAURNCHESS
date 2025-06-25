import { z } from "zod";

export const moveSchema = z.object({
  from: z.string().length(2),
  to: z.string().length(2),
  promotion: z.string().optional(),
});

export const createGameSchema = z.object({
  whiteId: z.string(),
  blackId: z.string(),
});

export type MoveInput = z.infer<typeof moveSchema>;
export type CreateGameInput = z.infer<typeof createGameSchema>;
