FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Exposer le port de l'application
EXPOSE 8089

# Démarrer l'application
CMD ["node", "index.js"]
