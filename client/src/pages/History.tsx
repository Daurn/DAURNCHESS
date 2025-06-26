import { useHistoryController } from "@/hooks/use-history-controller";
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
  } = useHistoryController();

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
                    <TableHead>Date</TableHead>
                    <TableHead>Résultat</TableHead>
                    <TableHead>Contrôle du temps</TableHead>
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
                      <TableCell>{game.opponent}</TableCell>
                      <TableCell>
                        {new Date(game.startTime).toLocaleDateString()} -{" "}
                        {new Date(game.endTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {game.result}
                        </span>
                      </TableCell>
                      <TableCell>{game.timeControl}</TableCell>
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
              Ceci est un panneau factice. Les détails de la partie sélectionnée
              apparaîtront ici.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 text-foreground">
            {/* À remplacer par les vrais détails */}
            <p>Contenu factice pour la partie : {selectedGame?.id}</p>
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
