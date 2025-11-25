const express = require('express');
const router = express.Router();
const axios = require('axios');

const MEAL_DB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Helper function to make cached API requests
 */
async function cachedRequest(cache, cacheKey, url) {
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Cache HIT: ${cacheKey}`);
    return cachedData;
  }

  // Cache miss - fetch from API
  console.log(`Cache MISS: ${cacheKey}`);
  try {
    const response = await axios.get(url);
    const data = response.data;
    
    // Store in cache
    cache.set(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error(`API Error for ${url}:`, error.message);
    throw error;
  }
}

/**
 * GET /api/meal/:id
 * Get meal details by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const mealId = req.params.id;
    const cache = req.app.locals.cache;
    const cacheKey = `meal_${mealId}`;
    const url = `${MEAL_DB_BASE_URL}/lookup.php?i=${mealId}`;
    
    const data = await cachedRequest(cache, cacheKey, url);
    
    if (!data.meals) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    res.json(data);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meal details', message: error.message });
  }
});

module.exports = router;
