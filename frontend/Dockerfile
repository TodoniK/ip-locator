# Utiliser une image Node.js officielle plus récente
FROM node:18

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 3002

# Démarrer l'application
CMD ["npm", "run", "serve"]
