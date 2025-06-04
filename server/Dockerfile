# Dockerfile

FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les deps
COPY server/package.json server/pnpm-lock.yaml ./

# Installer pnpm et les dépendances
RUN npm install -g pnpm && pnpm install

# Copier le reste du code (une fois les deps installées)
COPY server .

# Exposer le port (exemple)
EXPOSE 3000

# Lancer le serveur (ajuste selon ton entry point)
CMD ["pnpm", "dev"]
