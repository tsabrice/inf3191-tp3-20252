# Copyright 2024 TSAGUEU KENNANG BRICE AUREL CP: TSAB30359808 & TSAGUEU TAZIHOU GUILAINE CP: TSAG02359504
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, render_template, request, jsonify, flash, redirect, url_for, g
from database import Database
import re
import random
from datetime import datetime

app = Flask(__name__, static_url_path="", static_folder="static")
app.secret_key = 'your-secret-key-here'

def get_db():
    """Récupère une instance de la base de données"""
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database

@app.teardown_appcontext
def close_connection(exception):
    """Ferme la connexion à la base de données à la fin du contexte"""
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()

def convert_animal_fields(animal):
    """Convertit les noms de champs français vers anglais pour compatibilité"""
    if not animal:
        return None
        
    converted = {
        'id': animal['id'],
        'name': animal['nom'],
        'species': animal['espece'],
        'breed': animal['race'],
        'age': animal['age'],
        'description': animal['description'],
        'owner_email': animal['courriel'],
        'address': animal['adresse'],
        'city': animal['ville'],
        'postal_code': animal['cp'],
        'date_added': datetime.now().strftime('%Y-%m-%d')
    }
    return converted

def get_all_animals():
    """Récupère tous les animaux de la base de données"""
    db = get_db()
    animaux = db.get_animaux()
    return [convert_animal_fields(animal) for animal in animaux]

def get_animal_by_id(animal_id):
    """Récupère un animal spécifique par son ID"""
    db = get_db()
    animal = db.get_animal(animal_id)
    if animal:
        return convert_animal_fields(animal)
    return None

def add_animal_to_db(animal_data):
    """Ajoute un nouvel animal à la base de données"""
    db = get_db()
    return db.add_animal(
        animal_data['name'],
        animal_data['species'], 
        animal_data['breed'],
        animal_data['age'],
        animal_data['description'],
        animal_data['owner_email'],
        animal_data['address'],
        animal_data['city'],
        animal_data['postal_code']
    )

def search_animals(query):
    """Recherche des animaux selon une requête"""
    all_animals = get_all_animals()
    if not query:
        return all_animals
    
    query = query.lower().strip()
    results = []
    
    for animal in all_animals:
        if (query in animal['name'].lower() or
            query in animal['species'].lower() or
            query in animal['breed'].lower() or
            query in animal['description'].lower() or
            query in animal['city'].lower()):
            results.append(animal)
    
    return results

def get_random_animals(count=5):
    """Retourne un nombre spécifié d'animaux aléatoires"""
    all_animals = get_all_animals()
    if len(all_animals) == 0:
        return []
    return random.sample(all_animals, min(count, len(all_animals)))

def validate_animal_data(data):
    """Valide les données d'un animal selon les contraintes spécifiées"""
    errors = {}
    
    # Validation du nom (3-20 caractères, pas de virgule)
    name = data.get('name', '').strip()
    if not name:
        errors['name'] = 'Le nom est obligatoire'
    elif ',' in name:
        errors['name'] = 'Le nom ne peut pas contenir de virgule'
    elif len(name) < 3 or len(name) > 20:
        errors['name'] = 'Le nom doit avoir entre 3 et 20 caractères'
    
    # Validation de l'espèce
    species = data.get('species', '').strip()
    if not species:
        errors['species'] = 'L\'espèce est obligatoire'
    elif ',' in species:
        errors['species'] = 'L\'espèce ne peut pas contenir de virgule'
    
    # Validation de la race
    breed = data.get('breed', '').strip()
    if not breed:
        errors['breed'] = 'La race est obligatoire'
    elif ',' in breed:
        errors['breed'] = 'La race ne peut pas contenir de virgule'
    
    # Validation de l'âge (0-30, numérique)
    age = data.get('age')
    try:
        age = int(age)
        if age < 0 or age > 30:
            errors['age'] = 'L\'âge doit être entre 0 et 30 ans'
    except (ValueError, TypeError):
        errors['age'] = 'L\'âge doit être un nombre valide'
    
    # Validation de la description
    description = data.get('description', '').strip()
    if not description:
        errors['description'] = 'La description est obligatoire'
    elif ',' in description:
        errors['description'] = 'La description ne peut pas contenir de virgule'
    
    # Validation de l'email
    email = data.get('owner_email', '').strip()
    email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    if not email:
        errors['owner_email'] = 'L\'adresse courriel est obligatoire'
    elif ',' in email:
        errors['owner_email'] = 'L\'adresse courriel ne peut pas contenir de virgule'
    elif not re.match(email_regex, email):
        errors['owner_email'] = 'Format d\'adresse courriel invalide'
    
    # Validation de l'adresse
    address = data.get('address', '').strip()
    if not address:
        errors['address'] = 'L\'adresse civique est obligatoire'
    elif ',' in address:
        errors['address'] = 'L\'adresse civique ne peut pas contenir de virgule'
    
    # Validation de la ville
    city = data.get('city', '').strip()
    if not city:
        errors['city'] = 'La ville est obligatoire'
    elif ',' in city:
        errors['city'] = 'La ville ne peut pas contenir de virgule'
    
    # Validation du code postal canadien
    postal_code = data.get('postal_code', '').strip().upper()
    postal_regex = r'^[A-Z]\d[A-Z]\s?\d[A-Z]\d$'
    if not postal_code:
        errors['postal_code'] = 'Le code postal est obligatoire'
    elif ',' in postal_code:
        errors['postal_code'] = 'Le code postal ne peut pas contenir de virgule'
    elif not re.match(postal_regex, postal_code):
        errors['postal_code'] = 'Format de code postal canadien invalide (ex: H1H 1H1)'
    
    return errors

# Routes
@app.route('/')
def index():
    """Page d'accueil avec 5 animaux aléatoires"""
    featured_animals = get_random_animals(5)
    return render_template('index.html', animals=featured_animals)

@app.route('/animals')
def animals():
    """Page listant tous les animaux disponibles"""
    page = request.args.get('page', 1, type=int)
    per_page = 12
    
    all_animals = get_all_animals()
    start = (page - 1) * per_page
    end = start + per_page
    
    animals_list = all_animals[start:end]
    total_pages = (len(all_animals) + per_page - 1) // per_page
    
    return render_template('animals.html', 
                         animals=animals_list, 
                         page=page, 
                         total_pages=total_pages)

@app.route('/animal/<int:animal_id>')
def animal_detail(animal_id):
    """Page de détails d'un animal spécifique"""
    animal = get_animal_by_id(animal_id)
    if not animal:
        flash('Animal non trouvé', 'error')
        return redirect(url_for('animals'))
    
    return render_template('animal_detail.html', animal=animal)

@app.route('/search')
def search():
    """Recherche d'animaux"""
    query = request.args.get('q', '').strip()
    results = search_animals(query)
    
    return render_template('search_results.html', 
                         animals=results, 
                         query=query, 
                         count=len(results))

@app.route('/add-animal', methods=['GET', 'POST'])
def add_animal():
    """Formulaire d'ajout d'un animal en adoption"""
    if request.method == 'POST':
        errors = validate_animal_data(request.form)
        
        if errors:
            if request.headers.get('Content-Type') == 'application/json':
                return jsonify({'success': False, 'errors': errors}), 400
            else:
                for field, error in errors.items():
                    flash(error, 'error')
                return render_template('add_animal.html')
        
        new_animal = {
            'name': request.form['name'].strip(),
            'species': request.form['species'].strip(),
            'breed': request.form['breed'].strip(),
            'age': int(request.form['age']),
            'description': request.form['description'].strip(),
            'owner_email': request.form['owner_email'].strip(),
            'address': request.form['address'].strip(),
            'city': request.form['city'].strip(),
            'postal_code': request.form['postal_code'].strip().upper()
        }
        
        try:
            animal_id = add_animal_to_db(new_animal)
            flash('Votre animal a été ajouté avec succès !', 'success')
            
            if request.headers.get('Content-Type') == 'application/json':
                return jsonify({'success': True, 'message': 'Animal ajouté avec succès', 'animal_id': animal_id})
            else:
                return redirect(url_for('animals'))
                
        except Exception as e:
            flash('Une erreur est survenue lors de l\'ajout de l\'animal.', 'error')
            if request.headers.get('Content-Type') == 'application/json':
                return jsonify({'success': False, 'error': 'Erreur de base de données'}), 500
    
    return render_template('add_animal.html')

@app.route('/contact')
def contact():
    """Page de contact"""
    return render_template('contact.html')

# API Routes
@app.route('/api/animals')
def api_animals():
    """API pour récupérer la liste des animaux"""
    return jsonify(get_all_animals())

@app.route('/api/animal/<int:animal_id>')
def api_animal_detail(animal_id):
    """API pour récupérer les détails d'un animal"""
    animal = get_animal_by_id(animal_id)
    if not animal:
        return jsonify({'error': 'Animal non trouvé'}), 404
    
    return jsonify(animal)

@app.route('/api/search')
def api_search():
    """API pour rechercher des animaux"""
    query = request.args.get('q', '').strip()
    results = search_animals(query)
    
    return jsonify({
        'results': results,
        'count': len(results),
        'query': query
    })

@app.route('/api/random-animals')
def api_random_animals():
    """API pour récupérer des animaux aléatoires"""
    count = request.args.get('count', 5, type=int)
    animals = get_random_animals(count)
    return jsonify(animals)

# Filtres de template
@app.template_filter('truncate_words')
def truncate_words(text, length=20):
    """Tronque le texte à un nombre spécifique de mots"""
    words = text.split()
    if len(words) <= length:
        return text
    return ' '.join(words[:length]) + '...'

# Gestionnaires d'erreur
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)