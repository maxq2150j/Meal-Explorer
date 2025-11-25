const express = require('express');
const cors = require('cors');
const path = require('path');
const LRUCache = require('./cache');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize cache with 100 max entries and 5 minute TTL
const cache = new LRUCache(100, 300000);

// Make cache available to all routes
app.locals.cache = cache;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ============ Import Route Modules ============
const searchRoutes = require('./routes/search');
const categoriesRoutes = require('./routes/categories');
const categoryRoutes = require('./routes/category');
const randomRoutes = require('./routes/random');
const mealRoutes = require('./routes/meal');
const cacheRoutes = require('./routes/cache');

// ============ API Routes ============
app.use('/api/search', searchRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/random', randomRoutes);
app.use('/api/meal', mealRoutes);
app.use('/api/cache', cacheRoutes);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TheMealDB Explorer API running on http://localhost:${PORT}`);
  console.log(`📊 Cache configured: Max Size=${cache.maxSize}, TTL=${cache.ttl / 1000}s`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api/cache/stats`);
});

module.exports = app;
