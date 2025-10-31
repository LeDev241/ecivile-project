# Projet eCivile

Bienvenue dans le projet **eCivile**.# Projet eCivile

Bienvenue dans le projet **eCivile**. Ce dépôt contient le code source de l'application, ainsi que les configurations nécessaires pour son bon fonctionnement.

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :
- PHP (version recommandée : 8.x)
- Composer
- Node.js et npm
- Un serveur de base de données (MySQL, PostgreSQL, etc.)

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone <url-du-dépôt>
   cd ecivile-project  
   
   
# Installez les dépendances PHP avec Composer :
composer install

# Installez les dépendances JavaScript avec npm :
npm install

# Copiez le fichier .env.example en .env et configurez vos variables d'environnement :
cp .env.example .env

# Générez la clé de l'application :
php artisan key:generate

# Configurez la base de données dans le fichier .env, puis exécutez les migrations :
php artisan migrate