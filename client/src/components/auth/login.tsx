import { Navbar } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { useLoginController } from "@/hooks/use-login-controller";

export const Login = () => {
  const { credentials, handleChange, handleSubmit, error, isLoading } =
    useLoginController();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <h2 className="text-center text-3xl font-extrabold">
                Connexion à votre compte
              </h2>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
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
                    autoComplete="current-password"
                  />
                </div>
                {error && (
                  <div className="text-destructive text-sm">{error}</div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};
