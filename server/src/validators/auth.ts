import { z } from "zod";

const loginBodySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
  body: loginBodySchema,
});

const registerBodySchema = loginBodySchema.extend({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
});

export const registerSchema = z.object({
  body: registerBodySchema,
});

export type LoginInput = z.infer<typeof loginBodySchema>;
export type RegisterInput = z.infer<typeof registerBodySchema>;
