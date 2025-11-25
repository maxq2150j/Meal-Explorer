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
 * GET /api/search
 * Search meals by name
 * Query params: q (search query)
 */
router.get('/', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const cache = req.app.locals.cache;
    const cacheKey = `search_${query.toLowerCase()}`;
    const url = `${MEAL_DB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
    
    const data = await cachedRequest(cache, cacheKey, url);
    res.json(data);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to search meals', message: error.message });
  }
});

module.exports = router;
