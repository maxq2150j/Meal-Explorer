# TheMealDB Explorer

A modern web application to explore recipes, browse categories, and discover meals using TheMealDB API.

## Features

- 🔍 **Recipe Search**: Search for meals by name
- 📂 **Category Browser**: Browse meals by categories (Chicken, Vegan, Seafood, etc.)
- 🎲 **Random Meal**: "I'm feeling hungry" button for surprise recipes
- 📖 **Recipe Details**: View ingredients, instructions, and embedded YouTube videos
- 📱 **Responsive Design**: Works seamlessly on mobile and desktop
- ⚡ **Performance**: Built-in caching with configurable expiry and size limits

## Architecture

### Backend (Web Service API)
- **Framework**: Node.js with Express
- **Caching**: In-memory LRU cache with configurable expiry (5 minutes) and max size (100 entries)
- **API Integration**: Axios for TheMealDB API requests
- **RESTful Design**: Clean, predictable endpoints

### Frontend (UI Layer)
- **HTML5 + Bootstrap 5**: Responsive and modern UI
- **Vanilla JavaScript**: No complex framework dependencies
- **Features**: Search, category filtering, random meal generator, detailed recipe view

## Installation

1. **Clone or download the project**
```bash
cd "meal explorer"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## API Documentation

Base URL: `http://localhost:3000/api`

### Endpoints

#### 1. Search Meals by Name
```
GET /api/search?q={query}
```
**Example**: `/api/search?q=chicken`

**Response**:
```json
{
  "meals": [
    {
      "idMeal": "52940",
      "strMeal": "Chicken Alfredo",
      "strMealThumb": "...",
      "strCategory": "Chicken"
    }
  ]
}
```

#### 2. Get All Categories
```
GET /api/categories
```

**Response**:
```json
{
  "categories": [
    {
      "idCategory": "1",
      "strCategory": "Beef",
      "strCategoryThumb": "...",
      "strCategoryDescription": "..."
    }
  ]
}
```

#### 3. Get Meals by Category
```
GET /api/category/{categoryName}
```
**Example**: `/api/category/Seafood`

**Response**:
```json
{
  "meals": [
    {
      "idMeal": "52959",
      "strMeal": "Baked salmon",
      "strMealThumb": "..."
    }
  ]
}
```

#### 4. Get Random Meal
```
GET /api/random
```

**Response**:
```json
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Teriyaki Chicken Casserole",
      "strCategory": "Chicken",
      "strInstructions": "...",
      "strMealThumb": "...",
      "strYoutube": "...",
      "strIngredient1": "soy sauce",
      "strMeasure1": "3/4 cup"
    }
  ]
}
```

#### 5. Get Meal Details by ID
```
GET /api/meal/{id}
```
**Example**: `/api/meal/52772`

**Response**: Full meal details including ingredients, instructions, and video link

## Cache Configuration

The backend implements an LRU (Least Recently Used) cache with:
- **Expiry Time**: 5 minutes (300 seconds)
- **Max Size**: 100 entries
- **Strategy**: Automatic eviction of oldest entries when limit reached

## Project Structure

```
meal explorer/
├── server.js              # Express server entry point
├── cache.js               # LRU cache implementation
├── routes/                # API route handlers (organized by feature)
│   ├── search.js          # Search meals endpoint
│   ├── categories.js      # Get all categories endpoint
│   ├── category.js        # Get meals by category endpoint
│   ├── random.js          # Random meal endpoint
│   ├── meal.js            # Meal details endpoint
│   └── cache.js           # Cache management endpoints
├── public/
│   ├── index.html         # Main UI
│   ├── styles.css         # Custom styles
│   └── js/                # Frontend JavaScript modules
│       ├── app.js         # Application entry point
│       ├── api.js         # API calls and utilities
│       ├── categories.js  # Categories display logic
│       ├── search.js      # Search functionality
│       ├── random.js      # Random meal feature
│       ├── meals.js       # Meals grid display
│       └── recipe.js      # Recipe details modal
├── package.json           # Dependencies
└── README.md              # Documentation
```

## REST Principles Applied

- ✅ Resource-based URLs (`/api/meal/{id}`, `/api/category/{name}`)
- ✅ Standard HTTP methods (GET)
- ✅ Stateless communication
- ✅ JSON response format
- ✅ Proper status codes (200, 404, 500)
- ✅ Clear endpoint naming

## Technologies Used

**Backend**:
- Node.js
- Express.js
- Axios
- Custom LRU Cache

**Frontend**:
- HTML5
- Bootstrap 5
- Vanilla JavaScript
- Font Awesome icons

## Performance Optimizations

- In-memory caching reduces API calls
- Lazy loading of recipe details
- Debounced search input
- Responsive images with lazy loading
- Minified Bootstrap CSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Redis integration for distributed caching
- [ ] User favorites and bookmarks
- [ ] Advanced filtering (ingredients, cuisine)
- [ ] Meal planning features
- [ ] Recipe ratings and comments

## License

MIT

## Author

Developed as part of TheMealDB Explorer assignment.
