/**
 * Categories Module
 * Handles loading and displaying meal categories
 */

/**
 * Load and display categories
 */
async function loadCategories() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    
    try {
        showLoading(categoriesContainer);
        
        const data = await fetchAPI('/categories');
        const categories = data.categories || [];
        
        if (categories.length === 0) {
            showEmpty(categoriesContainer, 'No categories found');
            return;
        }
        
        displayCategories(categories);
    } catch (error) {
        showError('Failed to load categories');
    }
}

/**
 * Display categories
 */
function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categoriesContainer');
    
    categoriesContainer.innerHTML = categories.map(category => `
        <div class="card category-card" onclick="loadMealsByCategory('${category.strCategory}')">
            <img src="${category.strCategoryThumb}" 
                 alt="${category.strCategory}"
                 loading="lazy">
            <div class="card-body">
                <h5>${category.strCategory}</h5>
                <p class="text-muted small">${truncateText(category.strCategoryDescription, 60)}</p>
            </div>
        </div>
    `).join('');
}

/**
 * Load meals by category
 */
async function loadMealsByCategory(categoryName) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsSection = document.getElementById('resultsSection');
    
    try {
        showLoading(resultsContainer);
        resultsTitle.textContent = `${categoryName} Recipes`;
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        const data = await fetchAPI(`/category/${categoryName}`);
        const meals = data.meals || [];
        
        if (meals.length === 0) {
            showEmpty(resultsContainer, 'No meals found in this category');
            return;
        }
        
        displayMeals(meals);
    } catch (error) {
        showError('Failed to load meals');
    }
}
