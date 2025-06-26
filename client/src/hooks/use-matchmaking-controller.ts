import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MatchmakingStatus } from "../types/game";

export const useMatchmakingController = () => {
  const [status, setStatus] = useState<MatchmakingStatus>({
    status: "searching",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedElo, setSelectedElo] = useState<string>("1200");
  const [selectedColor, setSelectedColor] = useState<string>("random");
  const navigate = useNavigate();

  const handleStartSearch = async () => {
    setIsSearching(true);
    setStatus({ status: "searching" });
    sessionStorage.setItem("matchmaking-elo", selectedElo);
    sessionStorage.setItem("matchmaking-color", selectedColor);
    try {
      const response = await fetch("/api/stockfish/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerColor: selectedColor,
          elo: Number(selectedElo),
        }),
      });
      if (!response.ok) throw new Error("La création de la partie a échoué.");
      const gameData = await response.json();
      const { gameId } = gameData;
      setStatus({ status: "found", gameId });
      sessionStorage.setItem("canAccessGame-" + gameId, "true");
      navigate(`/game/${gameId}`);
    } catch (error) {
      console.error(error);
      setStatus({ status: "error" });
    } finally {
      setIsSearching(false);
    }
  };

  return {
    status,
    isSearching,
    selectedElo,
    setSelectedElo,
    selectedColor,
    setSelectedColor,
    handleStartSearch,
  };
};
