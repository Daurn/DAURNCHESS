import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChessGame from "./components/ChessGame";
import Index from "./components/Home";
import Login from "./components/Login";
import History from "./pages/History";
import Matchmaking from "./pages/Matchmaking";
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
