import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [selectedElo, setSelectedElo] = useState<string>("1200");
  const [selectedColor, setSelectedColor] = useState<string>("random");
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
      // Pour la suite : transmettre selectedElo et selectedColor à la création de partie contre Stockfish
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
              <div className="flex flex-col gap-4 mb-6">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Elo du robot
                  </label>
                  <Select value={selectedElo} onValueChange={setSelectedElo}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choisir l'Elo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="800">800</SelectItem>
                      <SelectItem value="1200">1200</SelectItem>
                      <SelectItem value="1600">1600</SelectItem>
                      <SelectItem value="2000">2000</SelectItem>
                      <SelectItem value="2500">2500</SelectItem>
                      <SelectItem value="3000">3000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Couleur
                  </label>
                  <Select
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choisir la couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="white">Blancs</SelectItem>
                      <SelectItem value="black">Noirs</SelectItem>
                      <SelectItem value="random">Aléatoire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
