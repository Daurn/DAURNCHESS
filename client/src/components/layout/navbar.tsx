import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useTheme } from "@/components/ui/theme-provider";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const { theme, setTheme } = useTheme();

  return (
    <nav className="w-full flex justify-center py-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/">Accueil</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/history">Historique</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="/matchmaking">Matchmaking</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
            >
              Déconnexion
            </button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Toggle
        aria-label="Basculer le thème"
        pressed={theme === "dark"}
        onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
        className="ml-2"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Toggle>
    </nav>
  );
}
