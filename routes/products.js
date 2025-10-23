// routes/products.js - Product API routes

const express = require('express');
const router = express.Router();
const { NotFoundError, ValidationError, authMiddleware, validateProduct } = require('../middleware');
const { ProductModel } = require('../models/data');

// GET /api/products - Get all products with filtering and pagination
router.get('/', async (req, res, next) => {
  try {
    let filteredProducts = ProductModel.filter({
      category: req.query.category,
      inStock: req.query.inStock !== undefined ? req.query.inStock === 'true' : undefined
    });
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({
      products: paginatedProducts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredProducts.length / limit),
        totalProducts: filteredProducts.length,
        hasNextPage: endIndex < filteredProducts.length,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id - Get a specific product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = ProductModel.getById(req.params.id);
    
    if (!product) {
      throw new NotFoundError(`Product with ID ${req.params.id} not found`);
    }
    
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// POST /api/products - Create a new product
router.post('/', authMiddleware, validateProduct, async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    
    const newProduct = ProductModel.create({
      name,
      description,
      price,
      category,
      inStock
    });
    
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/products/:id - Update an existing product
router.put('/:id', authMiddleware, validateProduct, async (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    
    const updatedProduct = ProductModel.update(req.params.id, {
      name,
      description,
      price,
      category,
      inStock
    });
    
    if (!updatedProduct) {
      throw new NotFoundError(`Product with ID ${req.params.id} not found`);
    }
    
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const deletedProduct = ProductModel.delete(req.params.id);
    
    if (!deletedProduct) {
      throw new NotFoundError(`Product with ID ${req.params.id} not found`);
    }
    
    res.json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/search - Search products by name
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      throw new ValidationError('Search query parameter "q" is required');
    }
    
    const searchResults = ProductModel.search(q);
    
    res.json({
      query: q,
      results: searchResults,
      count: searchResults.length
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/stats - Get product statistics
router.get('/stats', async (req, res, next) => {
  try {
    const stats = ProductModel.getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
