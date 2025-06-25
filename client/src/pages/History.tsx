import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import type { GameResult } from "../types";

export const History = () => {
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Historique des parties
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {games.map((game) => (
                <li key={game.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-indigo-600">
                        vs {game.opponent}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(game.startTime).toLocaleDateString()} -{" "}
                        {new Date(game.endTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {game.result}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {game.timeControl}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
