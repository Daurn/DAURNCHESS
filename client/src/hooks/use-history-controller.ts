import { useAuth } from "@/context/auth-provider";
import { useEffect, useState } from "react";
import type { Game } from "../types/game";

export const useHistoryController = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth?.() ?? { user: null };

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/games?status=FINISHED", {
          headers: { Authorization: `Bearer ${token}` },
        });
        let data: Game[] = [];
        try {
          data = await res.json();
        } catch {
          data = [];
        }
        const sortedGames = Array.isArray(data)
          ? data.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
          : [];
        setGames(sortedGames);
      } catch {
        setGames([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  return {
    games,
    isLoading,
    selectedGame,
    setSelectedGame,
    drawerOpen,
    setDrawerOpen,
    user,
  };
};
