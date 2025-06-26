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
import { useMatchmakingController } from "@/hooks/use-matchmaking-controller";
import Navbar from "../components/layout/navbar";

export const Matchmaking = () => {
  const {
    status,
    isSearching,
    selectedElo,
    setSelectedElo,
    selectedColor,
    setSelectedColor,
    handleStartSearch,
  } = useMatchmakingController();

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
                    Statut:{" "}
                    {(() => {
                      switch (status.status) {
                        case "searching":
                          return "En attente";
                        case "found":
                          return `Partie trouvée (ID: ${status.gameId})`;
                        case "error":
                          return "Erreur lors de la création de la partie.";
                        default:
                          return "Annulé";
                      }
                    })()}
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <Skeleton className="h-8 w-8 mx-auto rounded-full" />
                  <p className="mt-4">Recherche en cours...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Statut:{" "}
                    {(() => {
                      switch (status.status) {
                        case "searching":
                          return "Recherche en cours...";
                        case "found":
                          return `Partie trouvée (ID: ${status.gameId})`;
                        case "error":
                          return "Erreur lors de la création de la partie.";
                        default:
                          return "Annulé";
                      }
                    })()}
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
