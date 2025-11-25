const express = require('express');
const router = express.Router();

/**
 * GET /api/cache/stats
 * Get cache statistics (for monitoring)
 */
router.get('/stats', (req, res) => {
  const cache = req.app.locals.cache;
  res.json(cache.getStats());
});

/**
 * POST /api/cache/clear
 * Clear cache (admin endpoint)
 */
router.post('/clear', (req, res) => {
  const cache = req.app.locals.cache;
  cache.clear();
  res.json({ message: 'Cache cleared successfully' });
});

module.exports = router;
