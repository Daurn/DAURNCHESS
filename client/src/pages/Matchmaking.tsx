import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/navbar";
import type { MatchmakingStatus } from "../types";

export const Matchmaking = () => {
  const [status, setStatus] = useState<MatchmakingStatus>({
    status: "searching",
  });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleStartSearch = () => {
    setIsSearching(true);
    setStatus({ status: "searching" });
    // Simuler une recherche de partie
    setTimeout(() => {
      setIsSearching(false);
      const gameId = "1";
      setStatus({ status: "found", gameId });
      sessionStorage.setItem("canAccessGame-" + gameId, "true");
      navigate("/game/" + gameId);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">
                Recherche de partie
              </h2>
              <div className="space-y-4">
                {!isSearching ? (
                  <>
                    <button
                      onClick={handleStartSearch}
                      className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Rechercher une partie
                    </button>
                    <p className="mt-2 text-center text-sm text-gray-500">
                      Statut :{" "}
                      {status.status === "searching" && !status.gameId
                        ? "En attente"
                        : status.status === "found"
                        ? `Partie trouvée (ID: ${status.gameId})`
                        : "Annulé"}
                    </p>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Recherche en cours...</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Statut :{" "}
                      {status.status === "searching" && !status.gameId
                        ? "En attente"
                        : status.status === "found"
                        ? `Partie trouvée (ID: ${status.gameId})`
                        : "Annulé"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
