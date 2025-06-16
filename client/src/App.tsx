import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import History from "./pages/History";
import Matchmaking from "./pages/Matchmaking";
import ChessGame from "./pages/ChessGame";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/index" element={<Index />} />
        <Route path="/history" element={<History />} />
        <Route path="/matchmaking" element={<Matchmaking />} />
        <Route path="/game" element={<ChessGame />} />
      </Routes>
    </Router>
  );
}

export default App;
