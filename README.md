
# PetAdopt 🐾

Une plateforme gratuite d'adoption d'animaux de compagnie pour le Québec, connectant les animaux en besoin avec des familles aimantes.

## Fonctionnalités

- Parcourir et rechercher les animaux disponibles pour adoption
- Ajouter des animaux pour adoption avec validation de formulaire
- Design responsive pour tous les appareils
- Contacter les propriétaires directement par courriel
- Points de terminaison API REST pour accès programmatique

## Technologies

- **Backend**: Python, Flask, SQLite
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **Base de données**: SQLite avec table animaux

## Démarrage rapide

### Prérequis
- Python 3.8+
- Make (optionnel, pour faciliter les commandes)

### Installation et configuration

1. **Cloner et naviguer vers le projet**
   ```bash
   git clone git@github.com:tsabrice/inf3191-tp3-20252.git
   cd petadopt
   ```

2. **Installer les dépendances**
   ```bash
   make install
   # ou manuellement: pip install flask
   ```

3. **Initialiser la base de données**
   ```bash
   make init-db
   ```

4. **Lancer l'application**
   ```bash
   make run
   # ou alternativement: make flask-run
   ```

5. **Ouvrir le navigateur** → `http://127.0.0.1:5000`

### Commandes Makefile

- `make run` - Démarrer l'application (recommandé)
- `make flask-run` - Démarrer avec la commande flask run
- `make install` - Installer la dépendance Flask
- `make init-db` - Initialiser la base de données
- `make clean` - Supprimer les fichiers cache Python
- `make help` - Afficher toutes les commandes disponibles



## Licence

Sous licence Apache License 2.0
Copyright 2024 TSAGUEU KENNANG BRICE AUREL CP: TSAB30359808 & TSAGUEU TAZIHOU GUILAINE CP: TSAG02359504

---

Fait avec ❤️ pour les animaux du Québec
