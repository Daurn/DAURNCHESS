import app from "./app";
import gameRoutes from "./routes/gameRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

const PORT = process.env.PORT || 3000;

app.use("/games", gameRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API DaurnChess en ligne");
});

app.listen(PORT, () => {
  console.log(`Hello boss, server running on http://localhost:${PORT}`);
});
