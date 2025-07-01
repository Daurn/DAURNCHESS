import type { User } from "@/types/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MatchmakingStatus } from "../types/game";

export const useMatchmakingController = () => {
  const [status, setStatus] = useState<MatchmakingStatus>({
    status: "searching",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [selectedElo, setSelectedElo] = useState<string>("1200");
  const [selectedColor, setSelectedColorState] = useState<string>("white");
  const [displayedColor, setDisplayedColor] = useState<string>("white");
  const navigate = useNavigate();

  const handleStartSearch = async (user: User | null) => {
    if (!user) {
      setStatus({ status: "error" });
      console.error(
        "Utilisateur non authentifié, impossible de créer une partie."
      );
      return;
    }

    setIsSearching(true);
    setStatus({ status: "searching" });
    sessionStorage.setItem("matchmaking-elo", selectedElo);
    sessionStorage.setItem("matchmaking-color", selectedColor);

    try {
      const isPlayerWhite = selectedColor === "white";
      const response = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whiteId: isPlayerWhite ? user.id : null,
          blackId: !isPlayerWhite ? user.id : null,
          isBotGame: true,
        }),
      });
      if (!response.ok) throw new Error("La création de la partie a échoué.");
      const gameData = await response.json();
      const { id: gameId } = gameData;
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

  const setColor = (color: string) => {
    if (color === "random") {
      const realColor = Math.random() < 0.5 ? "white" : "black";
      setSelectedColorState(realColor);
      setDisplayedColor("random");
    } else {
      setSelectedColorState(color);
      setDisplayedColor(color);
    }
  };

  return {
    status,
    isSearching,
    selectedElo,
    setSelectedElo,
    selectedColor,
    displayedColor,
    setColor,
    handleStartSearch,
  };
};
