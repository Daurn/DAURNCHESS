import { useTheme } from "@/components/ui/theme-provider";
import { useEffect, useState } from "react";

export const useAuthNavbarController = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    const onStorage = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return {
    isAuthenticated,
    handleLogout,
    theme,
    setTheme,
  };
};
