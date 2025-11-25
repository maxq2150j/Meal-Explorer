/**
 * Search Module
 * Handles meal search functionality
 */

let searchTimeout;

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) {
        console.error('Search input not found');
        return;
    }
    
    // Enter key on search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Debounced search on input
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length >= 3) {
            searchTimeout = setTimeout(() => {
                handleSearch();
            }, 500);
        }
    });
}

/**
 * Handle search
 */
async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsSection = document.getElementById('resultsSection');
    
    const query = searchInput.value.trim();
    
    if (query.length === 0) {
        alert('Please enter a search term');
        return;
    }
    
    try {
        showLoading(resultsContainer);
        resultsTitle.textContent = `Search Results for "${query}"`;
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        const data = await fetchAPI(`/search?q=${encodeURIComponent(query)}`);
        const meals = data.meals || [];
        
        if (meals.length === 0) {
            showEmpty(resultsContainer, 'No meals found. Try a different search term.');
            return;
        }
        
        displayMeals(meals);
    } catch (error) {
        showError('Failed to search meals');
    }
}
