// form-validation.js - Validation côté client pour le formulaire d'adoption

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adoptionForm');
    if (form) {
        initializeValidation();
    }
});

function initializeValidation() {
    const form = document.getElementById('adoptionForm');
    
    // Validation en temps réel sur les champs
    const fields = [
        'animalName', 'animalSpecies', 'animalBreed', 'animalAge',
        'animalDescription', 'ownerEmail', 'address', 'city', 'postalCode'
    ];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            // Validation à la saisie
            field.addEventListener('input', function() {
                validateField(fieldId);
            });
            
            // Validation à la perte de focus
            field.addEventListener('blur', function() {
                validateField(fieldId);
            });
        }
    });
    
    // Formatage automatique du code postal
    const postalCodeField = document.getElementById('postalCode');
    if (postalCodeField) {
        postalCodeField.addEventListener('input', formatPostalCode);
    }
    
    // Validation lors de la soumission
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
}

function validateForm() {
    clearAllErrors();
    let isValid = true;
    
    // Validation de tous les champs
    const validations = [
        () => validateAnimalName(),
        () => validateAnimalSpecies(),
        () => validateAnimalBreed(),
        () => validateAnimalAge(),
        () => validateAnimalDescription(),
        () => validateOwnerEmail(),
        () => validateAddress(),
        () => validateCity(),
        () => validatePostalCode()
    ];
    
    validations.forEach(validation => {
        if (!validation()) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(fieldId) {
    switch(fieldId) {
        case 'animalName':
            return validateAnimalName();
        case 'animalSpecies':
            return validateAnimalSpecies();
        case 'animalBreed':
            return validateAnimalBreed();
        case 'animalAge':
            return validateAnimalAge();
        case 'animalDescription':
            return validateAnimalDescription();
        case 'ownerEmail':
            return validateOwnerEmail();
        case 'address':
            return validateAddress();
        case 'city':
            return validateCity();
        case 'postalCode':
            return validatePostalCode();
        default:
            return true;
    }
}

// Validations spécifiques pour chaque champ

function validateAnimalName() {
    const field = document.getElementById('animalName');
    const value = field.value.trim();
    
    if (!value) {
        showError('animalName', 'Le nom de l\'animal est obligatoire');
        return false;
    }
    
    if (value.includes(',')) {
        showError('animalName', 'Le nom ne peut pas contenir de virgule');
        return false;
    }
    
    if (value.length < 3 || value.length > 20) {
        showError('animalName', 'Le nom doit avoir entre 3 et 20 caractères');
        return false;
    }
    
    clearError('animalName');
    return true;
}

function validateAnimalSpecies() {
    const field = document.getElementById('animalSpecies');
    const value = field.value.trim();
    
    if (!value) {
        showError('animalSpecies', 'L\'espèce est obligatoire');
        return false;
    }
    
    if (value.includes(',')) {
        showError('animalSpecies', 'L\'espèce ne peut pas contenir de virgule');
        return false;
    }
    
    clearError('animalSpecies');
    return true;
}

function validateAnimalBreed() {
    const field = document.getElementById('animalBreed');
    const value = field.value.trim();
    
    if (!value) {
        showError('animalBreed', 'La race est obligatoire');
        return false;
    }
    
    if (value.includes(',')) {
        showError('animalBreed', 'La race ne peut pas contenir de virgule');
        return false;
    }
    
    clearError('animalBreed');
    return true;
}

function validateAnimalAge() {
    const field = document.getElementById('animalAge');
    const value = field.value.trim();
    
    if (!value) {
        showError('animalAge', 'L\'âge est obligatoire');
        return false;
    }
    
    const age = parseInt(value);
    if (isNaN(age)) {
        showError('animalAge', 'L\'âge doit être un nombre valide');
        return false;
    }
    
    if (age < 0 || age > 30) {
        showError('animalAge', 'L\'âge doit être entre 0 et 30 ans');
        return false;
    }
    
    clearError('animalAge');
    return true;
}

function validateAnimalDescription() {
    const field = document.getElementById('animalDescription');
    const value = field.value.trim();
    
    if (!value) {
        showError('animalDescription', 'La description est obligatoire');
        return false;
    }
    
    if (value.includes(',')) {
        showError('animalDescription', 'La description ne peut pas contenir de virgule');
        return false;
    }
    
    clearError('animalDescription');
    return true;
}

function validateOwnerEmail() {
    const field = document.getElementById('ownerEmail');
    const value = field.value.trim();
    
    if (!value) {
        showError('ownerEmail', 'L\'adresse courriel est obligatoire');
        return false;
    }
    
    if (value.includes(',')) {
        showError('ownerEmail', 'L\'adresse courriel ne peut pas contenir de virgule');
        return false;
    }
    
    // Validation du format email plus stricte
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(value)) {
        showError('ownerEmail', 'Format d\'adresse courriel invalide');
        return false;
    }
    
    clearError('ownerEmail');
    return true;
}

function validateAddress() {
    const field = document.getElementById('address');
    const value = field.value.trim();
    
    if (!value) {
        showError('address', 'L\'adresse civique est obligatoire');
        return false;
    }
    
    if (value.includes(',')) {
        showError('address', 'L\'adresse civique ne peut pas contenir de virgule');
        return false;
    }
    
    clearError('address');
    return true;
}

function validateCity() {
    const field = document.getElementById('city');
    const value = field.value.trim();
    
    if (!value) {
        showError('city', 'La ville est obligatoire');
        return false;
    }
    
    if (value.includes(',')) {
        showError('city', 'La ville ne peut pas contenir de virgule');
        return false;
    }
    
    clearError('city');
    return true;
}

function validatePostalCode() {
    const field = document.getElementById('postalCode');
    const value = field.value.trim().toUpperCase();
    
    if (!value) {
        showError('postalCode', 'Le code postal est obligatoire');
        return false;
    }
    
    if (value.includes(',')) {
        showError('postalCode', 'Le code postal ne peut pas contenir de virgule');
        return false;
    }
    
    // Validation du format canadien : A1A 1A1 ou A1A1A1
    const postalRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/;
    
    if (!postalRegex.test(value)) {
        showError('postalCode', 'Format de code postal canadien invalide (ex: H1H 1H1)');
        return false;
    }
    
    clearError('postalCode');
    return true;
}

// Fonctions utilitaires

function formatPostalCode(event) {
    let value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Formater automatiquement avec un espace après 3 caractères
    if (value.length > 3) {
        value = value.substring(0, 3) + ' ' + value.substring(3, 6);
    }
    
    event.target.value = value;
    
    // Valider en temps réel
    validatePostalCode();
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = getErrorElement(fieldId);
    
    // Ajouter la classe d'erreur au champ
    field.classList.add('is-invalid');
    
    // Afficher le message d'erreur
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.classList.add('text-danger', 'small', 'mt-1');
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = getErrorElement(fieldId);
    
    // Retirer la classe d'erreur
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    // Cacher le message d'erreur
    errorElement.style.display = 'none';
    errorElement.textContent = '';
}

function clearAllErrors() {
    const fields = [
        'animalName', 'animalSpecies', 'animalBreed', 'animalAge',
        'animalDescription', 'ownerEmail', 'address', 'city', 'postalCode'
    ];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = getErrorElement(fieldId);
        
        if (field) {
            field.classList.remove('is-invalid', 'is-valid');
        }
        
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    });
}

function getErrorElement(fieldId) {
    let errorElement = document.getElementById(fieldId + 'Error');
    
    if (!errorElement) {
        // Créer l'élément d'erreur s'il n'existe pas
        errorElement = document.createElement('div');
        errorElement.id = fieldId + 'Error';
        errorElement.className = 'error-message';
        
        const field = document.getElementById(fieldId);
        field.parentNode.appendChild(errorElement);
    }
    
    return errorElement;
}

// Fonction globale pour validation manuelle
window.validateAdoptionForm = validateForm;