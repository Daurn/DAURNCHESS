export default function Matchmaking() {
  const handleMatchmaking = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/matchmaking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to start matchmaking");
      }

      const data = await res.json();
      console.log("Matchmaking started:", data);
    } catch (error) {
      console.error("Error during matchmaking:", error);
    }
  };

  return (
    <div className="matchmaking-page">
      <h2>Matchmaking</h2>
      <button onClick={handleMatchmaking}>Start Matchmaking</button>
    </div>
  );
}
