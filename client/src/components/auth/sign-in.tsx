import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { useSignInController } from "@/hooks/use-sign-in-controller";

export const SignIn = () => {
  const { credentials, handleChange, handleSubmit, error, isLoading } =
    useSignInController();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <h2 className="text-center text-3xl font-extrabold">
                Créer un compte
              </h2>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    type="text"
                    required
                    placeholder="Nom d'utilisateur"
                    value={credentials.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                  <Input
                    type="email"
                    required
                    placeholder="Adresse email"
                    value={credentials.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <Input
                    type="password"
                    required
                    placeholder="Mot de passe"
                    value={credentials.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
                {error && (
                  <div className="text-destructive text-sm">{error}</div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Inscription..." : "S'inscrire"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};
