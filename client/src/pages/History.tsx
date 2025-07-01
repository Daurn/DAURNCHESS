import { useHistoryController } from "@/hooks/use-history-controller";
import type { Game } from "@/types/game";
import Navbar from "../components/layout/navbar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer";
import { Skeleton } from "../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export const History = () => {
  const {
    games,
    isLoading,
    selectedGame,
    setSelectedGame,
    drawerOpen,
    setDrawerOpen,
    user,
  } = useHistoryController();

  // Fonction utilitaire pour déterminer l'adversaire
  const getOpponent = (game: Game) => {
    if (game.isBotGame) return "Stockfish";
    if (!user) return "?";
    if (game.whiteId === user.id) return game.black?.username || "?";
    if (game.blackId === user.id) return game.white?.username || "?";
    return "?";
  };

  // Nouvelle fonction pour afficher l'Elo de l'adversaire
  const getOpponentElo = (game: Game) => {
    return game.elo ?? "?";
  };

  // Fonction utilitaire pour déterminer le résultat
  const getResult = (game: Game) => {
    if (!user) return "?";
    if (game.status !== "FINISHED") return "En cours";
    if (!game.winnerId) return "Nul";
    if (game.winnerId === user.id) return "Gagné";
    return "Perdu";
  };

  // Contrôle du temps (placeholder, à adapter si champs dédiés plus tard)
  const getTimeControl = (game: Game) => {
    // Si tu ajoutes un champ timeControl dans Game, adapte ici
    return game.isBotGame ? "vs Bot" : "Classique";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Historique des parties
          </h2>
          <Card>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adversaire</TableHead>
                    <TableHead>Elo adversaire</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Résultat</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {games.map((game) => (
                    <TableRow
                      key={game.id}
                      className="cursor-pointer hover:bg-muted/70"
                      onClick={() => {
                        setSelectedGame(game);
                        setDrawerOpen(true);
                      }}
                    >
                      <TableCell>{getOpponent(game)}</TableCell>
                      <TableCell>{getOpponentElo(game)}</TableCell>
                      <TableCell>
                        {new Date(game.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {getResult(game)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>
      </div>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
        <DrawerContent className="w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Détail de la partie</DrawerTitle>
            <DrawerDescription>
              {selectedGame ? (
                <>
                  <div className="mb-2">
                    Adversaire : {getOpponent(selectedGame)}
                  </div>
                  <div className="mb-2">
                    Résultat : {getResult(selectedGame)}
                  </div>
                  <div className="mb-2">
                    Début : {new Date(selectedGame.createdAt).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    Fin : {new Date(selectedGame.updatedAt).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    Contrôle du temps : {getTimeControl(selectedGame)}
                  </div>
                  <div className="mb-2">
                    FEN final :{" "}
                    <span className="break-all">{selectedGame.fen}</span>
                  </div>
                </>
              ) : (
                <>Aucune partie sélectionnée.</>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 text-foreground">
            {/* On pourrait afficher ici la liste des coups, etc. */}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Fermer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
