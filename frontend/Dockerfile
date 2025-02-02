# Utiliser une image Node.js officielle
FROM node:14

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Exposer le port de l'application
EXPOSE 80

# Démarrer l'application
CMD ["npm", "run", "serve"]
