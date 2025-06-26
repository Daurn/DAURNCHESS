import app from "./app";
import { env } from "./config/env";

const PORT = Number(env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Hello boss, server running on http://localhost:${PORT}`);
});
