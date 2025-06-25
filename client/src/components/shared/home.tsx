import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-2 py-6 relative">
      <Card className="w-full max-w-xl mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Bienvenue sur DAURNCHESS
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Jouez aux échecs en ligne, discutez avec vos amis et suivez votre
            historique de parties.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-4">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={() => navigate("/matchmaking")}
          >
            Jouer une partie
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => navigate("/history")}
          >
            Historique des parties
          </Button>
        </CardContent>
      </Card>
      <Card className="w-full max-w-xl mb-8">
        <CardHeader>
          <CardTitle>À propos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            DAURNCHESS est un projet portfolio moderne, conçu pour démontrer mes
            compétences en développement web avec React, TypeScript, Shadcn UI,
            Radix, Tailwind, Prisma et Next.js. L'objectif est de proposer une
            expérience utilisateur fluide, responsive et agréable, tout en
            mettant en avant les meilleures pratiques du développement frontend.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Fonctionnalités</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Parties d'échecs en temps réel avec vos amis</li>
            <li>Chat intégré pendant les parties</li>
            <li>Historique détaillé de vos parties</li>
            <li>Interface responsive et mode sombre/clair</li>
            <li>Design moderne basé sur Shadcn UI & Tailwind</li>
          </ul>
        </CardContent>
      </Card>
      <Separator className="my-8 w-full max-w-xl" />
      <footer className="text-xs text-muted-foreground text-center mt-4">
        © {new Date().getFullYear()} DAURNCHESS — Projet portfolio par Daurn
      </footer>
    </div>
  );
};
