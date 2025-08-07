// main.js - JavaScript principal pour l'application PetAdopt

// Initialisation générale
document.addEventListener('DOMContentLoaded', function() {
    // Supprimer le loader après chargement
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);

    // Initialiser les animations
    initializeAnimations();
    
    // Initialiser la navigation
    initializeNavigation();
    
    // Initialiser les formulaires
    initializeForms();
});

// Gestion des animations
function initializeAnimations() {
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

// Navigation active et scroll fluide
function initializeNavigation() {
    // Smooth scrolling pour les liens d'ancre
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

    // Mise à jour de la navigation active au scroll
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Initialisation des formulaires
function initializeForms() {
    // Formatage automatique du code postal
    const postalCodeInputs = document.querySelectorAll('#postalCode, input[name="postal_code"]');
    postalCodeInputs.forEach(input => {
        input.addEventListener('input', formatPostalCode);
    });
    
    // Nettoyage des résultats de recherche
    const searchInputs = document.querySelectorAll('#searchInput, input[name="q"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            if (!e.target.value.trim() && typeof showAllAnimals === 'function') {
                showAllAnimals();
            }
        });
    });
}

// Formatage automatique du code postal canadien
function formatPostalCode(e) {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 3) {
        value = value.substring(0, 3) + ' ' + value.substring(3, 6);
    }
    e.target.value = value;
}

// Validation générale des formulaires
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    clearErrors();
    let isValid = true;
    
    // Validation spécifique selon le formulaire
    if (formId === 'adoptionForm') {
        isValid = validateAdoptionForm();
    }
    
    return isValid;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (!errorElement) return;
    
    const inputElement = errorElement.previousElementSibling;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

// Validation du formulaire d'adoption (si présent)
function validateAdoptionForm() {
    let isValid = true;

    // Validation du nom
    const name = document.getElementById('animalName')?.value?.trim();
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

    // Validation de l'espèce
    const species = document.getElementById('animalSpecies')?.value;
    if (!species) {
        showError('speciesError', 'L\'espèce est obligatoire');
        isValid = false;
    } else if (species.includes(',')) {
        showError('speciesError', 'L\'espèce ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validation de la race
    const breed = document.getElementById('animalBreed')?.value?.trim();
    if (!breed) {
        showError('breedError', 'La race est obligatoire');
        isValid = false;
    } else if (breed.includes(',')) {
        showError('breedError', 'La race ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validation de l'âge
    const age = document.getElementById('animalAge')?.value;
    if (!age) {
        showError('ageError', 'L\'âge est obligatoire');
        isValid = false;
    } else if (isNaN(age) || age < 0 || age > 30) {
        showError('ageError', 'L\'âge doit être un nombre entre 0 et 30');
        isValid = false;
    }

    // Validation de la description
    const description = document.getElementById('animalDescription')?.value?.trim();
    if (!description) {
        showError('descriptionError', 'La description est obligatoire');
        isValid = false;
    } else if (description.includes(',')) {
        showError('descriptionError', 'La description ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validation de l'email
    const email = document.getElementById('ownerEmail')?.value?.trim();
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

    // Validation de l'adresse
    const address = document.getElementById('address')?.value?.trim();
    if (!address) {
        showError('addressError', 'L\'adresse civique est obligatoire');
        isValid = false;
    } else if (address.includes(',')) {
        showError('addressError', 'L\'adresse civique ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validation de la ville
    const city = document.getElementById('city')?.value?.trim();
    if (!city) {
        showError('cityError', 'La ville est obligatoire');
        isValid = false;
    } else if (city.includes(',')) {
        showError('cityError', 'La ville ne peut pas contenir de virgule');
        isValid = false;
    }

    // Validation du code postal
    const postalCode = document.getElementById('postalCode')?.value?.trim().toUpperCase();
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

    return isValid;
}

// Utilitaires pour l'API
function fetchAPI(url, options = {}) {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        return response.json();
    });
}

// Fonctions globales disponibles
window.PetAdopt = {
    validateForm,
    clearErrors,
    showError,
    formatPostalCode,
    fetchAPI
};