/**
 * Main Application Entry Point
 * Initializes all modules and event listeners
 */

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initializeRecipeModal();
    initializeSearch();
    initializeRandomMeal();
    initializeSidebar();
    initializeFilterTabs();
    
    // Load initial data
    loadCategories();
});

/**
 * Initialize sidebar toggle
 */
function initializeSidebar() {
    const toggleBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !toggleBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Menu item clicks
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            const view = item.dataset.view;
            handleMenuNavigation(view);
            
            // Close sidebar on mobile after selection
            sidebar.classList.remove('active');
        });
    });
}

/**
 * Initialize filter tabs
 */
function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filter = tab.dataset.filter;
            handleFilterChange(filter);
        });
    });
}

/**
 * Handle menu navigation
 */
function handleMenuNavigation(view) {
    const categoriesSection = document.getElementById('categoriesSection');
    const resultsSection = document.getElementById('resultsSection');
    
    switch(view) {
        case 'home':
        case 'recipes':
        case 'meals':
            categoriesSection.style.display = 'block';
            resultsSection.style.display = 'none';
            loadCategories();
            break;
    }
}

/**
 * Handle filter tab changes
 */
function handleFilterChange(filter) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsSection = document.getElementById('resultsSection');
    const resultsTitle = document.getElementById('resultsTitle');
    
    switch(filter) {
        case 'all':
            loadCategories();
            break;
        case 'breakfast':
            loadMealsByCategory('Breakfast');
            break;
        case 'vegetarian':
            loadMealsByCategory('Vegetarian');
            break;
        case 'dessert':
            loadMealsByCategory('Dessert');
            break;
    }
}

// Service Worker (Optional for PWA)
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA features
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}
