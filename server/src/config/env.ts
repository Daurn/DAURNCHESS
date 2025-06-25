import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  CORS_ORIGIN: z.string().default("http://localhost:8080"),
});

const validateEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const missingVars = (error as z.ZodError).errors
        .map((err: { path: (string | number)[] }) => err.path.join("."))
        .join(", ");
      throw new Error(
        `❌ Invalid environment variables: ${missingVars}. Please check your .env file`
      );
    }
    throw error;
  }
};

export const env = validateEnv();

export type Env = z.infer<typeof envSchema>;
