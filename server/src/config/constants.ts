export const AUTH = {
  TOKEN_EXPIRATION: "24h",
  SALT_ROUNDS: 10,
};

export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
};

export const CHESS = {
  DEFAULT_TIME_CONTROL: {
    initial: 600, // 10 minutes
    increment: 5, // 5 seconds
  },
  MAX_MOVES: 200,
};

export const API = {
  PREFIX: "/api",
  VERSION: "v1",
};

export const CORS = {
  METHODS: ["GET", "POST", "PUT", "DELETE", "PATCH"] as const,
  ALLOWED_HEADERS: ["Content-Type", "Authorization"] as const,
};
