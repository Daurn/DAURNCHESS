import { Chessboard } from "react-chessboard";
import type { UseChessGameControllerProps } from "../../hooks/use-chess-game-controller";
import { useChessGameController } from "../../hooks/use-chess-game-controller";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type Props = UseChessGameControllerProps;

export const ChessGame = ({ elo, initialColor, gameId }: Props) => {
  const {
    fen,
    gameOver,
    result,
    isChatVisible,
    setIsChatVisible,
    boardWidth,
    boardContainerRef,
    playerColor,
    isDraggablePiece,
    onDrop,
    resetGame,
  } = useChessGameController({ elo, initialColor, gameId });

  return (
    <div className="flex h-screen p-4 gap-4 box-border">
      <div
        className={cn(
          "flex flex-col transition-all duration-300 ease-in-out flex-1",
          isChatVisible ? "mr-8" : "items-start justify-center mr-0"
        )}
      >
        <Card className="mb-4">
          <CardContent className="p-2 text-sm text-muted-foreground">
            <div>Elo du robot : {elo}</div>
            <div>Couleur choisie : {initialColor}</div>
            <div>Votre couleur : {playerColor}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-center">
            <div
              ref={boardContainerRef}
              className="w-full flex justify-center items-center"
            >
              <Chessboard
                position={fen}
                onPieceDrop={onDrop}
                boardWidth={boardWidth}
                boardOrientation={playerColor}
                isDraggablePiece={isDraggablePiece}
              />
            </div>
          </CardContent>
        </Card>
        {gameOver && (
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold">{result}</p>
            </CardContent>
          </Card>
        )}
        <Button onClick={resetGame} disabled>
          Nouvelle Partie
        </Button>
      </div>

      <div
        className={cn(
          "flex flex-col transition-all duration-300 ease-in-out",
          isChatVisible ? "w-[40%]" : "w-0 opacity-0"
        )}
      >
        <Card className={cn("flex flex-col", !isChatVisible && "invisible")}>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Ici : timer, joueur, score, etc.</p>
          </CardContent>
          <Separator />
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chat</h2>
            </div>
            <div className="border h-64 p-2 rounded overflow-y-auto bg-background">
              <p>(Messages ici)</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed top-4 right-4">
        <Button
          onClick={() => setIsChatVisible(!isChatVisible)}
          variant="outline"
          size="sm"
        >
          {isChatVisible ? "Cacher le chat" : "Afficher le chat"}
        </Button>
      </div>
    </div>
  );
};
