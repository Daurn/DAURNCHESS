import { Game, History, Home, Matchmaking, NotFound } from "@/pages";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login, SignIn } from "./components/auth";
import { ThemeProvider } from "./components/ui";

import "./App.css";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/history" element={<History />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
