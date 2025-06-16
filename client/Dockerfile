FROM node:18-alpine

# Installer pnpm
RUN npm install -g pnpm

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package depuis le bon dossier
COPY client/package.json ./ 
COPY client/pnpm-lock.yaml ./ 

# Copier le reste du projet client
COPY client/ .

# Exposer le port utilisé par Vite
EXPOSE 8080

# Lancer le serveur de dev
CMD ["npm", "run", "dev"]
