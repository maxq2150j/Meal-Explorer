// API Base URL
const API_BASE_URL = '/api';

/**
 * Fetch data from API
 */
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        showError('Failed to fetch data. Please try again.');
        throw error;
    }
}

/**
 * Show loading spinner
 */
function showLoading(container) {
    container.innerHTML = `
        <div class="loading-container">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-muted">Loading delicious recipes...</p>
        </div>
    `;
}

/**
 * Show empty state
 */
function showEmpty(container, message) {
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-search"></i>
            <h3>No Results Found</h3>
            <p class="text-muted">${message}</p>
        </div>
    `;
}

/**
 * Show error message
 */
function showError(message) {
    console.error(message);
    // You could implement a toast notification here
}

/**
 * Truncate text
 */
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}
