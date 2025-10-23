// server.js - Express.js RESTful API for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Import custom middleware and routes
const { loggerMiddleware, authMiddleware, validateProduct, errorHandler } = require('./middleware');
const productRoutes = require('./routes/products');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// API Routes
app.use('/api/products', productRoutes);

// Apply error handling middleware (must be last)
app.use(errorHandler);

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    / - Welcome message');
  console.log('  GET    /api/products - List all products (with filtering & pagination)');
  console.log('  GET    /api/products/:id - Get specific product');
  console.log('  POST   /api/products - Create new product (requires API key)');
  console.log('  PUT    /api/products/:id - Update product (requires API key)');
  console.log('  DELETE /api/products/:id - Delete product (requires API key)');
  console.log('  GET    /api/products/search?q=query - Search products');
  console.log('  GET    /api/products/stats - Get product statistics');
  console.log('\nAPI Key: your-secret-api-key (use in x-api-key header)');
});

// Export the app for testing purposes
module.exports = app; 