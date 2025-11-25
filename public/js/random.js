/**
 * Random Meal Module
 * Handles random meal generation
 */

/**
 * Initialize random meal button
 */
function initializeRandomMeal() {
    const randomBtn = document.getElementById('randomBtn');
    randomBtn.addEventListener('click', handleRandomMeal);
}

/**
 * Handle random meal
 */
async function handleRandomMeal() {
    const randomBtn = document.getElementById('randomBtn');
    
    try {
        randomBtn.disabled = true;
        randomBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Loading...';
        
        const data = await fetchAPI('/random');
        const meal = data.meals ? data.meals[0] : null;
        
        if (meal) {
            showMealDetails(meal.idMeal);
        } else {
            alert('Failed to get random meal');
        }
    } catch (error) {
        alert('Failed to get random meal');
    } finally {
        randomBtn.disabled = false;
        randomBtn.innerHTML = '<i class="fas fa-random me-1"></i> I\'m Feeling Hungry!';
    }
}
