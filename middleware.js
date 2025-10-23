// middleware.js - Custom middleware for Express.js API

// Custom Error Classes
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

// Logger middleware
const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return next(new AuthenticationError('API key is required in x-api-key header'));
  }
  
  // Simple API key validation (in production, use proper authentication)
  if (apiKey !== 'your-secret-api-key') {
    return next(new AuthenticationError('Invalid API key'));
  }
  
  next();
};

// Validation middleware for product creation/update
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return next(new ValidationError('Name is required and must be a non-empty string'));
  }
  
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    return next(new ValidationError('Description is required and must be a non-empty string'));
  }
  
  if (typeof price !== 'number' || price < 0) {
    return next(new ValidationError('Price is required and must be a positive number'));
  }
  
  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    return next(new ValidationError('Category is required and must be a non-empty string'));
  }
  
  if (typeof inStock !== 'boolean') {
    return next(new ValidationError('inStock is required and must be a boolean'));
  }
  
  next();
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: 'Not Found',
      message: err.message,
      statusCode: 404
    });
  }
  
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      statusCode: 400
    });
  }
  
  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      error: 'Authentication Error',
      message: err.message,
      statusCode: 401
    });
  }
  
  // Default error
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong',
    statusCode: 500
  });
};

module.exports = {
  NotFoundError,
  ValidationError,
  AuthenticationError,
  loggerMiddleware,
  authMiddleware,
  validateProduct,
  errorHandler
};
