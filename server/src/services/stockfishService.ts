import { spawn } from "child_process";

export type StockfishOptions = {
  skillLevel?: number; // 0-20
  elo?: number; // 1350-2850
  movetime?: number; // ms
};

export const getStockfishMove = async (
  fen: string,
  options: StockfishOptions = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stockfish = spawn("stockfish");
    let bestMove = "";
    let error = "";

    const { skillLevel = 20, elo, movetime = 1000 } = options;

    stockfish.stdin.write("uci\n");
    if (elo) stockfish.stdin.write(`setoption name UCI_Elo value ${elo}\n`);
    stockfish.stdin.write(`setoption name Skill Level value ${skillLevel}\n`);
    stockfish.stdin.write(`position fen ${fen}\n`);
    stockfish.stdin.write(`go movetime ${movetime}\n`);

    stockfish.stdout.on("data", (data) => {
      const lines = data.toString().split("\n");
      for (const line of lines) {
        if (line.startsWith("bestmove ")) {
          bestMove = line.split(" ")[1];
          stockfish.stdin.write("quit\n");
        }
      }
    });

    stockfish.stderr.on("data", (data) => {
      error += data.toString();
    });

    stockfish.on("close", () => {
      if (bestMove) resolve(bestMove);
      else reject(error || "No move found");
    });

    stockfish.on("error", (err) => {
      reject(err);
    });
  });
};
