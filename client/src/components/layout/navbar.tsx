export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/index">Accueil</a>
        </li>
        <li>
          <a href="/history">Historique</a>
        </li>
        <li>
          <a href="/matchmaking">Matchmaking</a>
        </li>
        <li>
          <a href="/game">Partie</a>
        </li>
        <li>
          <button onClick={handleLogout}>Déconnexion</button>
        </li>
      </ul>
    </nav>
  );
}
