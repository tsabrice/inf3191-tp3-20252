
document.addEventListener('DOMContentLoaded', function() {
    const query = window.searchQuery ? window.searchQuery.toLowerCase() : '';
    if (query && query.length > 2) {
        highlightSearchTerms(query);
    }
});

function highlightSearchTerms(searchTerm) {
    const elements = document.querySelectorAll('.animal-name, .animal-description, .animal-details');
    
    elements.forEach(element => {
        const text = element.innerHTML;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
        element.innerHTML = highlightedText;
    });
}

// Fonction pour afficher tous les animaux (appelée depuis main.js)
function showAllAnimals() {
    window.location.href = '/animals';
}


// Passer la requête de recherche au JavaScript
window.searchQuery = "{{ query | safe }}";