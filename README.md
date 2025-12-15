# IP Locator

IP Locator est une application web qui permet de localiser une adresse IP. Elle est construite avec JavaScript et utilise plusieurs dépendances clés pour fonctionner.

## Technologies utilisées

### Backend
- Node.js 22 (LTS)
- Express 4.21.2
- Mongoose 8.9.3
- MongoDB 6.12.0
- Swagger UI Express 5.0.1

### Frontend
- Vue 3.5.13
- Vite 6.0.5 (build tool moderne et rapide)
- ESLint 9.17.0 (avec flat config)
- Axios 1.7.9
- Vue Leaflet 0.10.1 (pour les cartes)

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Naviguez jusqu'au répertoire du projet et exécutez `npm install` pour installer les dépendances.
3. Créez un fichier `.env` à la racine du projet et ajoutez-y vos variables d'environnement (les informations de connexion à la base de données MongoDB).
4. Exécutez `npm run dev` pour démarrer le serveur de développement.

## Développement

### Backend
```bash
cd backend
npm install
npm run dev
```
Le serveur démarre sur `http://localhost:8089`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Le frontend démarre sur `http://localhost:3002`

## Production avec Docker

```bash
docker-compose up --build
```

## Utilisation

Une fois le serveur démarré, vous pouvez accéder à l'API à l'adresse `http://localhost:8089`. La documentation de l'API est disponible à `http://localhost:8089/api-docs`. Le frontend est disponible sur `http://localhost:3002`.

## Licence

Ce projet est sous licence ISC. Voir le fichier `LICENSE` pour plus d'informations.
