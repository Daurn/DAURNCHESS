import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/auth/login";
import { SignIn } from "./components/auth/sign-in";
import { ChessGame } from "./components/game/chess-game";
import { Home } from "./components/shared/home";
import { History } from "./pages/History";
import { Matchmaking } from "./pages/Matchmaking";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/index" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/matchmaking" element={<Matchmaking />} />
        <Route path="/game" element={<ChessGame />} />
      </Routes>
    </Router>
  );
};

export default App;
