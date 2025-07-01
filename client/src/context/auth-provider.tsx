import type { User } from "@/types/auth";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // TODO: Adapter cette route si vous avez une route dédiée comme /api/users/me
        // Pour l'instant, on prend le premier utilisateur de la liste.
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Utilisateur non authentifié");
        }
        const users = await res.json();
        if (users && users.length > 0) {
          setUser(users[0]);
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
