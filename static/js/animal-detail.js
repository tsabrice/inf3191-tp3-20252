// animal-detail.js - JavaScript pour la page de détails d'un animal

// Charger des suggestions d'animaux similaires
document.addEventListener('DOMContentLoaded', function() {
    loadSuggestedAnimals();
});

function loadSuggestedAnimals() {
    fetch('/api/random-animals?count=3')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau: ' + response.status);
            }
            return response.json();
        })
        .then(animals => {
            const container = document.getElementById('suggestedAnimals');
            const currentAnimalId = window.currentAnimalId; // Récupéré depuis le template
            
            // Vérifier que animals est un tableau
            if (!Array.isArray(animals)) {
                console.error('Les données reçues ne sont pas un tableau:', animals);
                showError(container, 'Erreur lors du chargement des suggestions.');
                return;
            }
            
            // Filtrer l'animal actuel
            const filteredAnimals = animals.filter(animal => animal.id !== currentAnimalId);
            
            if (filteredAnimals.length === 0) {
                showError(container, 'Aucune suggestion disponible pour le moment.');
                return;
            }
            
            // Générer le HTML pour les suggestions
            container.innerHTML = filteredAnimals.map(animal => {
                return createAnimalCard(animal);
            }).join('');
        })
        .catch(function(error) {
            console.error('Erreur lors du chargement des suggestions:', error);
            const container = document.getElementById('suggestedAnimals');
            if (container) {
                showError(container, 'Erreur lors du chargement des suggestions.');
            }
        });
}

function createAnimalCard(animal) {
    // Vérifier que les propriétés existent avant de les utiliser
    const name = animal.name || 'Nom non disponible';
    const species = animal.species || 'Espèce inconnue';
    const breed = animal.breed || 'Race inconnue';
    const age = animal.age || 0;
    const description = animal.description || 'Aucune description disponible';
    const city = animal.city || 'Ville inconnue';
    const postalCode = animal.postal_code || '';
    const image = animal.image || 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop';
    
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="animal-card">
                <div class="animal-image">
                    <img src="${image}" 
                         alt="${name}" 
                         loading="lazy" 
                         onerror="this.src='https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop'">
                    <div class="animal-badge">${species}</div>
                </div>
                <div class="animal-info">
                    <h4 class="animal-name">${name}</h4>
                    <div class="animal-details">
                        <strong>${breed}</strong> • ${age} an${age > 1 ? 's' : ''}
                    </div>
                    <p class="animal-description">
                        ${description.substring(0, 100)}${description.length > 100 ? '...' : ''}
                    </p>
                    <div class="animal-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${city}${postalCode ? ', ' + postalCode : ''}
                    </div>
                    <a href="/animal/${animal.id}" class="contact-btn">
                        <i class="fas fa-info-circle me-2"></i>Voir détails
                    </a>
                </div>
            </div>
        </div>
    `;
}

function showError(container, message) {
    if (container) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">${message}</p>
            </div>
        `;
    }
}