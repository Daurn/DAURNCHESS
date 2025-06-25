import { z } from "zod";

export const updateUserBodySchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
  })
  .partial();

export const userParamsSchema = z.object({
  id: z.string().uuid("Invalid user ID"),
});

export const updateUserSchema = z.object({
  body: updateUserBodySchema,
  params: userParamsSchema,
});

export const userIdSchema = z.object({
  params: userParamsSchema,
});

export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;
