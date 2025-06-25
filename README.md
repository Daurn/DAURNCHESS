# DAURNCHESS

> ⚠️ **Ce site est toujours en développement : certaines fonctionnalités peuvent ne pas être opérationnelles ou complètes pour le moment.**

DAURNCHESS est une application web de jeu d'échecs permettant de jouer en ligne avec vos amis, de discuter pendant les parties et de consulter l'historique de vos matchs. Ce projet a pour objectif de démontrer mes compétences en développement web fullstack moderne (React, Next.js, Node.js, Prisma, PostgreSQL, Tailwind, Shadcn UI, Radix UI, etc.).

## Objectifs

- **Portfolio** : Montrer mon expertise technique et mes bonnes pratiques à des recruteurs, clients ou entreprises.
- **Expérience utilisateur** : Proposer une interface moderne, responsive et agréable.
- **Fonctionnalités sociales** : Jouer, discuter, suivre ses performances.

---

## Fonctionnalités principales

- Authentification sécurisée (inscription, connexion)
- Création et gestion de parties d'échecs en temps réel
- Chat intégré pendant les parties
- Historique des parties jouées
- Système de classement Elo
- Interface responsive et moderne (Shadcn UI, Radix, Tailwind)
- Optimisation des performances (SSR, RSC, lazy loading, etc.)

---

## Stack technique

### Frontend

- **React** + **TypeScript** (Vite)
- **React Router DOM** pour la navigation
- **Tailwind CSS** pour le style
- **Shadcn UI** & **Radix UI** pour les composants UI
- **Axios** pour les requêtes API
- **chess.js** & **react-chessboard** pour la logique et l'affichage du jeu

### Backend

- **Node.js** + **Express**
- **Prisma** (ORM) & **PostgreSQL** (base de données)
- **JWT** pour l'authentification
- **Zod** pour la validation des schémas

### DevOps

- **Docker** & **docker-compose** pour l'orchestration
- **ESLint**, **Prettier** pour la qualité du code
- **Jest** pour les tests

---

## Modèle de données (extrait)

```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  email     String   @unique
  password  String
  rating    Int      @default(1200)
  // ...
}

model Game {
  id        String   @id @default(uuid())
  whiteId   String
  blackId   String
  winnerId  String?
  status    GameStatus @default(WAITING)
  fen       String
  moves     String[]
  // ...
}

model ChatMessage {
  id        String   @id @default(uuid())
  gameId    String
  userId    String
  content   String
  // ...
}
```

---

## Structure du projet

```
DAURNCHESS/
  client/      # Frontend React/TS
    src/
      components/   # Composants UI (auth, game, layout, etc.)
      pages/        # Pages principales (History, Matchmaking)
      services/     # Appels API
      types/        # Types TypeScript
      ...
  server/      # Backend Node/Express
    src/
      controllers/  # Logique métier (auth, game, user)
      routes/       # Définition des routes API
      prisma/       # Modèle de données Prisma
      ...
  docker-compose.yml
  README.md
```

---

## Installation & Lancement

### Prérequis

- Node.js (>= 18)
- pnpm (ou npm/yarn)
- Docker & docker-compose

### Démarrage rapide

```bash
# 1. Cloner le repo
git clone https://github.com/ton-utilisateur/DAURNCHESS.git
cd DAURNCHESS

# 2. Lancer l'ensemble (client + server + db)
docker-compose up --build

# 3. Accéder à l'application
# Frontend : http://localhost:8080
# Backend  : http://localhost:3000
# DB       : localhost:5432 (postgres/postgres)
```
