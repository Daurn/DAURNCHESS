export const getStockfishMove = async (fen: string, skillLevel = 1) => {
  const response = await fetch("/api/stockfish-move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fen, skillLevel }),
  });
  if (!response.ok) throw new Error("Erreur lors de la requête à Stockfish");
  const data = await response.json();
  return data.move; // exemple : 'e7e5'
};
