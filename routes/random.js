const express = require('express');
const router = express.Router();
const axios = require('axios');

const MEAL_DB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * GET /api/random
 * Get a random meal
 * Note: Random meals are not cached to ensure variety
 */
router.get('/', async (req, res) => {
  try {
    const url = `${MEAL_DB_BASE_URL}/random.php`;
    const response = await axios.get(url);
    res.json(response.data);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random meal', message: error.message });
  }
});

module.exports = router;
