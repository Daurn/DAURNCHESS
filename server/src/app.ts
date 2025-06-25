// server/src/app.ts
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import authRoutes from "./routes/authRoutes";
import gameRoutes from "./routes/gameRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middlewares de base
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Health check route
app.get("/api", (_req, res) => {
  res.send("API DaurnChess is online");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

export default app;
