# Variables d'environnement
export FLASK_APP=index.py
export FLASK_ENV=development
export FLASK_DEBUG=1

# Commande run
run:
	python index.py

# Alternative avec flask run (si vous préférez)
flask-run:
	@echo "Setting up Flask environment..."
	@export PYTHONPATH=$$PWD && flask run

# Commande pour installer les dépendances
install:
	pip install flask

# Commande pour nettoyer les fichiers cache
clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete

# Commande pour créer la base de données (si nécessaire)
init-db:
	python -c "from database import Database; db = Database()"

# Aide
help:
	@echo "Commandes disponibles:"
	@echo "  make run       - Lancer l'application"
	@echo "  make flask-run - Lancer avec flask run"
	@echo "  make install   - Installer Flask"
	@echo "  make clean     - Nettoyer les fichiers cache"
	@echo "  make init-db   - Initialiser la base de données"

.PHONY: run flask-run install clean init-db help