import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/auth/login";
import { SignIn } from "./components/auth/sign-in";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Game } from "./pages/Game";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { Matchmaking } from "./pages/Matchmaking";
import { NotFound } from "./pages/NotFound";

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
