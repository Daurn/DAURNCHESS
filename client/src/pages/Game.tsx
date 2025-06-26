import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChessGame } from "../components/game/chess-game";
import Navbar from "../components/layout/navbar";

export const Game = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Récupérer les paramètres de matchmaking
  const elo = sessionStorage.getItem("matchmaking-elo") || "1200";
  const color = sessionStorage.getItem("matchmaking-color") || "random";

  useEffect(() => {
    if (!id || sessionStorage.getItem("canAccessGame-" + id) !== "true") {
      navigate("/matchmaking");
    }
  }, [navigate, id]);

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <ChessGame elo={elo} initialColor={color} gameId={id} />
      </main>
    </>
  );
};
