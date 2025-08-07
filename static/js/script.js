// L'endroit où placer le code du front-end.

// Sample animal data
const animals = [
    {
        id: 1,
        name: "Bella",
        species: "Chien",
        breed: "Golden Retriever",
        age: 3,
        description: "Bella est une chienne très affectueuse et énergique. Elle adore jouer avec les enfants et se promener dans le parc. Parfaite pour une famille active !",
        ownerEmail: "marie.tremblay@email.com",
        address: "123 Rue des Érables, Montréal, H2X 1Y7",
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Minou",
        species: "Chat",
        breed: "Persan",
        age: 5,
        description: "Minou est un chat calme et affectueux qui aime les câlins. Il s'entend bien avec les autres animaux et préfère la tranquillité d'un foyer paisible.",
        ownerEmail: "jean.dubois@email.com",
        address: "456 Avenue du Parc, Québec, G1R 2L9",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Rex",
        species: "Chien",
        breed: "Berger Allemand",
        age: 2,
        description: "Rex est un jeune chien intelligent et loyal. Il a besoin d'exercice quotidien et serait parfait pour quelqu'un qui aime les activités en plein air.",
        ownerEmail: "sophie.martin@email.com",
        address: "789 Boulevard Saint-Laurent, Laval, H7M 3J4",
        image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Luna",
        species: "Chat",
        breed: "Maine Coon",
        age: 1,
        description: "Luna est une jeune chatte très joueuse et curieuse. Elle adore explorer et s'amuser avec des jouets. Idéale pour une famille qui aime l'interaction.",
        ownerEmail: "pierre.gagnon@email.com",
        address: "321 Rue de la Paix, Sherbrooke, J1H 2K8",
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Charlie",
        species: "Lapin",
        breed: "Nain Bélier",
        age: 2,
        description: "Charlie est un lapin adorable et sociable qui aime être caressé. Il est propre et facile d'entretien, parfait pour un premier animal de compagnie.",
        ownerEmail: "annie.roy@email.com",
        address: "654 Chemin des Pins, Trois-Rivières, G9A 5H2",
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop"
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Remove loader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);

    // Load random animals on homepage
    loadRandomAnimals();

    // Initialize animations
    observeElements();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Load random animals for homepage
function loadRandomAnimals() {
    const container = document.getElementById('animalsContainer');
    const shuffled = [...animals].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    container.innerHTML = selected.map(animal => createAnimalCard(animal)).join('');
}

// Create animal card HTML
function createAnimalCard(animal) {
    return `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="animal-card fade-in">
                        <div class="animal-image">
                            <img src="${animal.image}" alt="${animal.name}">
                            <div class="animal-badge">${animal.species}</div>
                        </div>
                        <div class="animal-info">
                            <h4 class="animal-name">${animal.name}</h4>
                            <div class="animal-details">
                                <strong>${animal.breed}</strong> • ${animal.age} an${animal.age > 1 ? 's' : ''}
                            </div>
                            <p class="animal-description">${animal.description.substring(0, 100)}...</p>
                            <div class="animal-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${animal.address.split(',')[1]} ${animal.address.split(',')[2]}
                            </div>
                            <button class="contact-btn" onclick="showAnimalDetails(${animal.id})">
                                <i class="fas fa-info-circle me-2"></i>Voir détails
                            </button>
                        </div>
                    </div>
                </div>
            `;
}

// Search animals
function searchAnimals(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!query) {
        alert('Veuillez entrer un terme de recherche');
        return;
    }

    const results = animals.filter(animal =>
        animal.name.toLowerCase().includes(query) ||
        animal.species.toLowerCase().includes(query) ||
        animal.breed.toLowerCase().includes(query) ||
        animal.description.toLowerCase().includes(query)
    );

    displaySearchResults(results, query);
}

// Display search results
function displaySearchResults(results, query) {
    const animalsSection = document.getElementById('animalsContainer').parentElement;
    const searchSection = document.getElementById('searchResults');
    const searchContainer = document.getElementById('searchContainer');

    animalsSection.style.display = 'none';
    searchSection.style.display = 'block';

    if (results.length === 0) {
        searchContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-info">
                            <h4>Aucun résultat trouvé</h4>
                            <p>Aucun animal ne correspond à votre recherche "${query}".</p>
                            <button class="btn btn-primary" onclick="showAllAnimals()">Voir tous les animaux</button>
                        </div>
                    </div>
                `;
    } else {
        searchContainer.innerHTML = `
                    <div class="col-12 mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="mb-0">${results.length} résultat${results.length > 1 ? 's' : ''} pour "${query}"</p>
                            <button class="btn btn-outline-primary" onclick="showAllAnimals()">Retour à tous les animaux</button>
                        </div>
                        <hr>
                    </div>
                    ${results.map(animal => createAnimalCard(animal)).join('')}
                `;
    }

    // Scroll to results
    searchSection.scrollIntoView({ behavior: 'smooth' });
}

// Show all animals
function showAllAnimals() {
    const animalsSection = document.getElementById('animalsContainer').parentElement;
    const searchSection = document.getElementById('searchResults');

    searchSection.style.display = 'none';
    animalsSection.style.display = 'block';

    // Clear search input
    document.getElementById('searchInput').value = '';

    // Scroll to animals section
    animalsSection.scrollIntoView({ behavior: 'smooth' });
}

// Show animal details in modal
function showAnimalDetails(animalId) {
    const animal = animals.find(a => a.id === animalId);
    if (!animal) return;

    document.getElementById('modalAnimalName').textContent = animal.name;
    document.getElementById('modalAnimalContent').innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${animal.image}" alt="${animal.name}" class="img-fluid rounded mb-3">
                    </div>
                    <div class="col-md-6">
                        <h5 class="text-primary mb-3">Informations</h5>
                        <p><strong>Espèce:</strong> ${animal.species}</p>
                        <p><strong>Race:</strong> ${animal.breed}</p>
                        <p><strong>Âge:</strong> ${animal.age} an${animal.age > 1 ? 's' : ''}</p>
                        <p><strong>Localisation:</strong> ${animal.address}</p>
                        
                        <h5 class="text-primary mb-3 mt-4">Description</h5>
                        <p>${animal.description}</p>
                        
                        <div class="mt-4">
                            <a href="mailto:${animal.ownerEmail}?subject=Intérêt pour l'adoption de ${animal.name}&body=Bonjour,%0D%0A%0D%0AJe suis intéressé(e) par l'adoption de ${animal.name}. Pourriez-vous me donner plus d'informations?%0D%0A%0D%0AMerci!" 
                               class="contact-btn">
                                <i class="fas fa-envelope me-2"></i>Contacter le propriétaire
                            </a>
                        </div>
                    </div>
                </div>
            `;

    new bootstrap.Modal(document.getElementById('animalModal')).show();
}

// Form validation and submission
function submitAdoption(event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));

    let isValid = true;

    // Validate name (3-20 characters, no commas)
    const name = document.getElementById('animalName').value.trim();
    if (!name) {
        showError('nameError', 'Le nom est obligatoire');
        isValid = false;
    } else if (name.includes(',')) {
        showError('nameError', 'Le nom ne peut pas contenir de virgule');
        isValid = false;
    } else if (name.length < 3 || name.length > 20) {
        showError('nameError', 'Le nom doit avoir entre 3 et 20 caractères');
        isValid = false;
    }

    // Validate species
    const species = document.getElementById('animalSpecies').value;
    if (!species) {
        showError('speciesError', 'L\'espèce est obligatoire');
        isValid = false;
    } else if (species.includes(',')) {
        showError('speciesError', 'L\'espèce ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validate breed
    const breed = document.getElementById('animalBreed').value.trim();
    if (!breed) {
        showError('breedError', 'La race est obligatoire');
        isValid = false;
    } else if (breed.includes(',')) {
        showError('breedError', 'La race ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validate age (0-30, numeric)
    const age = document.getElementById('animalAge').value;
    if (!age) {
        showError('ageError', 'L\'âge est obligatoire');
        isValid = false;
    } else if (isNaN(age) || age < 0 || age > 30) {
        showError('ageError', 'L\'âge doit être un nombre entre 0 et 30');
        isValid = false;
    }

    // Validate description
    const description = document.getElementById('animalDescription').value.trim();
    if (!description) {
        showError('descriptionError', 'La description est obligatoire');
        isValid = false;
    } else if (description.includes(',')) {
        showError('descriptionError', 'La description ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('ownerEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('emailError', 'L\'adresse courriel est obligatoire');
        isValid = false;
    } else if (email.includes(',')) {
        showError('emailError', 'L\'adresse courriel ne peut pas contenir de virgule');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('emailError', 'Format d\'adresse courriel invalide');
        isValid = false;
    }

    // Validate address
    const address = document.getElementById('address').value.trim();
    if (!address) {
        showError('addressError', 'L\'adresse civique est obligatoire');
        isValid = false;
    } else if (address.includes(',')) {
        showError('addressError', 'L\'adresse civique ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validate city
    const city = document.getElementById('city').value.trim();
    if (!city) {
        showError('cityError', 'La ville est obligatoire');
        isValid = false;
    } else if (city.includes(',')) {
        showError('cityError', 'La ville ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validate postal code (Canadian format)
    const postalCode = document.getElementById('postalCode').value.trim().toUpperCase();
    const postalRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/;
    if (!postalCode) {
        showError('postalError', 'Le code postal est obligatoire');
        isValid = false;
    } else if (postalCode.includes(',')) {
        showError('postalError', 'Le code postal ne peut pas contenir de virgule');
        isValid = false;
    } else if (!postalRegex.test(postalCode)) {
        showError('postalError', 'Format de code postal canadien invalide (ex: H1H 1H1)');
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        alert('Merci ! Votre animal a été ajouté avec succès. Il sera visible après modération.');
        document.getElementById('adoptionForm').reset();

        // Add to animals array (simulation)
        const newAnimal = {
            id: animals.length + 1,
            name: name,
            species: species,
            breed: breed,
            age: parseInt(age),
            description: description,
            ownerEmail: email,
            address: `${address}, ${city}, ${postalCode}`,
            image: `https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop`
        };
        animals.push(newAnimal);

        // Reload animals display
        loadRandomAnimals();
    }
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputElement = errorElement.previousElementSibling;

    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('error');
}

// Animation observer
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Update active navigation link
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add real-time validation for postal code formatting
document.getElementById('postalCode').addEventListener('input', function (e) {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 3) {
        value = value.substring(0, 3) + ' ' + value.substring(3, 6);
    }
    e.target.value = value;
});

// Clear search results when input is cleared
document.getElementById('searchInput').addEventListener('input', function (e) {
    if (!e.target.value.trim()) {
        showAllAnimals();
    }
});
