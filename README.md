# ProjectManagementTool CI CD

## Déclencheurs (on)
Le pipeline se déclenche automatiquement lorsque : Un commit est poussé sur la branche main du dépôt.

## Jobs
Le pipeline contient un seul job nommé build qui s'exécute sur une machine virtuelle ubuntu-latest.

## Étapes du Job
Checkout du Code
Action utilisée : actions/checkout@v4
Description : Cette étape récupère le code source de Notre dépôt GitHub dans l'environnement de build.

## Configuration de Node.js
Action utilisée : actions/setup-node@v4
Description : Installe Node.js version 20 et met en cache les dépendances NPM pour accélérer les builds futurs.

## Installation des Dépendances
Commande exécutée : npm install
Description : Installe les dépendances de notre application Angular spécifiées dans le fichier package.json. Cette étape est cruciale pour préparer l'environnement de build.

## Construction de l'Application
Commande exécutée : npm run build --prod
Description : Compile l'application Angular en mode production. Le résultat est un dossier dist contenant les fichiers statiques optimisés pour le déploiement.

## Construction de l'Image Docker
Commande exécutée : docker build -t ahmad200/pmt-frontend:latest .
Description : Utilise le Dockerfile situé à la racine du projet pour construire une image Docker contenant l'application Angular. L'image est taguée latest et sera stockée sous le nom ahmad200/pmt-frontend.

## Connexion à Docker Hub
Action utilisée : docker/login-action@v3
Description : Se connecte à Docker Hub en utilisant les identifiants stockés dans les secrets GitHub (DOCKER_HUB_USERNAME et DOCKER_HUB_ACCESS_TOKEN). Cette étape est nécessaire pour pousser l'image Docker vers Docker Hub.

## Poussée de l'Image Docker
Commande exécutée : docker push ahmad200/pmt-frontend:latest
Description : Pousse l'image Docker construite précédemment sur Docker Hub, la rendant disponible pour le déploiement sur des serveurs ou d'autres environnements.

## Exécution des Tests (optionnel)
Commande exécutée : npm test -- --watchAll=false
Description : Exécute les tests unitaires de l'application Angular pour vérifier que tout fonctionne comme prévu.
