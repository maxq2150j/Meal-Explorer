/**
 * Recipe Details Module
 * Handles displaying detailed recipe information in modal
 */

let recipeModal;

/**
 * Initialize recipe modal
 */
function initializeRecipeModal() {
    recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
}

/**
 * Show meal details in modal
 */
async function showMealDetails(mealId) {
    const recipeModalBody = document.getElementById('recipeModalBody');
    const recipeModalLabel = document.getElementById('recipeModalLabel');
    
    try {
        recipeModalBody.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        recipeModal.show();
        
        const data = await fetchAPI(`/meal/${mealId}`);
        const meal = data.meals ? data.meals[0] : null;
        
        if (!meal) {
            recipeModalBody.innerHTML = '<p class="text-center text-danger">Meal not found</p>';
            return;
        }
        
        displayRecipeDetails(meal);
    } catch (error) {
        recipeModalBody.innerHTML = '<p class="text-center text-danger">Failed to load recipe details</p>';
    }
}

/**
 * Display recipe details
 */
function displayRecipeDetails(meal) {
    const recipeModalBody = document.getElementById('recipeModalBody');
    const recipeModalLabel = document.getElementById('recipeModalLabel');
    
    recipeModalLabel.textContent = meal.strMeal;
    
    // Get ingredients
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
        }
    }
    
    // Get YouTube video ID
    let youtubeEmbed = '';
    if (meal.strYoutube) {
        const videoId = meal.strYoutube.split('v=')[1] || meal.strYoutube.split('/').pop();
        youtubeEmbed = `
            <div class="recipe-section">
                <h4><i class="fas fa-video me-2"></i>Video Tutorial</h4>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}" 
                            allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
    }
    
    recipeModalBody.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">
        
        <div class="recipe-badges">
            ${meal.strCategory ? `<span class="badge bg-primary me-2"><i class="fas fa-tag me-1"></i>${meal.strCategory}</span>` : ''}
            ${meal.strArea ? `<span class="badge bg-success me-2"><i class="fas fa-globe me-1"></i>${meal.strArea}</span>` : ''}
            ${meal.strTags ? meal.strTags.split(',').map(tag => 
                `<span class="badge bg-secondary me-2">${tag.trim()}</span>`
            ).join('') : ''}
        </div>
        
        <div class="recipe-section">
            <h4><i class="fas fa-shopping-basket me-2"></i>Ingredients</h4>
            <ul class="ingredients-list">
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
        
        <div class="recipe-section">
            <h4><i class="fas fa-list-ol me-2"></i>Instructions</h4>
            <div class="instructions">${meal.strInstructions}</div>
        </div>
        
        ${youtubeEmbed}
        
        ${meal.strSource ? `
            <div class="text-center mt-4">
                <a href="${meal.strSource}" target="_blank" class="btn btn-outline-primary">
                    <i class="fas fa-external-link-alt me-2"></i>View Original Recipe
                </a>
            </div>
        ` : ''}
    `;
}
