import { useEffect, useState } from "react";
import axios from "axios";

type GameResult = {
  id: number;
  opponent: string;
  startTime: string;
  endTime: string;
  timeControl: string;
  result: string;
};

export default function History() {
  const [games, setGames] = useState<GameResult[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/games", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGames(res.data);
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h2>Historique des parties</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.startTime} → {game.endTime} | vs {game.opponent} |
            {game.result} | {game.timeControl}
          </li>
        ))}
      </ul>
    </div>
  );
}
