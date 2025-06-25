import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
      <div className="min-h-screen bg-background py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <Card>
            <CardContent className="sm:p-10">
              <h2 className="text-3xl font-semibold tracking-tight text-center mb-8">
                Recherche de partie
              </h2>
              {!isSearching ? (
                <>
                  <Button onClick={handleStartSearch} className="w-full">
                    Rechercher une partie
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
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
                  <Skeleton className="h-8 w-8 mx-auto rounded-full" />
                  <p className="mt-4">Recherche en cours...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Statut :{" "}
                    {status.status === "searching" && !status.gameId
                      ? "En attente"
                      : status.status === "found"
                      ? `Partie trouvée (ID: ${status.gameId})`
                      : "Annulé"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
