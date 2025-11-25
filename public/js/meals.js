/**
 * Display meals in grid
 */
function displayMeals(meals) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    resultsContainer.innerHTML = meals.map(meal => `
        <div class="card meal-card" onclick="showMealDetails('${meal.idMeal}')">
            <img src="${meal.strMealThumb}" 
                 alt="${meal.strMeal}"
                 loading="lazy">
            <div class="card-body">
                <h5>${meal.strMeal}</h5>
                ${meal.strCategory ? `<span class="badge">${meal.strCategory}</span>` : ''}
            </div>
        </div>
    `).join('');
}
