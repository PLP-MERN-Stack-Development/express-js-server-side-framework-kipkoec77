# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Project Structure

```
express-js-server-side-framework-kipkoec77/
├── server.js              # Main server file
├── middleware.js          # Custom middleware
├── routes/
│   └── products.js        # Product API routes
├── models/
│   └── data.js           # Data models and sample data
├── package.json          # Dependencies and scripts
├── env.example           # Environment variables template
├── README.md             # API documentation
└── Week2-Assignment.md   # Assignment instructions
```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Main Express.js server file
- `middleware.js`: Custom middleware (logger, auth, validation, error handling)
- `routes/products.js`: Product API routes
- `models/data.js`: Data models and sample data
- `package.json`: Project dependencies and scripts
- `env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

### Basic Routes

- `GET /` - Welcome message
- `GET /api/products` - Get all products (with filtering & pagination)
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (requires API key)
- `PUT /api/products/:id` - Update a product (requires API key)
- `DELETE /api/products/:id` - Delete a product (requires API key)

### Advanced Features

- `GET /api/products/search?q=query` - Search products by name or description
- `GET /api/products/stats` - Get product statistics

## API Documentation

### Authentication

All POST, PUT, and DELETE operations require authentication via API key header:
```
x-api-key: your-secret-api-key
```

### Product Schema

```json
{
  "id": "string (UUID)",
  "name": "string (required)",
  "description": "string (required)",
  "price": "number (required, >= 0)",
  "category": "string (required)",
  "inStock": "boolean (required)"
}
```

### Request/Response Examples

#### 1. Get All Products
```bash
GET /api/products
```

Response:
```json
{
  "products": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalProducts": 3,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

#### 2. Filter Products by Category
```bash
GET /api/products?category=electronics
```

#### 3. Pagination
```bash
GET /api/products?page=1&limit=2
```

#### 4. Filter by Stock Status
```bash
GET /api/products?inStock=true
```

#### 5. Get Specific Product
```bash
GET /api/products/1
```

Response:
```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

#### 6. Create New Product
```bash
POST /api/products
Content-Type: application/json
x-api-key: your-secret-api-key

{
  "name": "Tablet",
  "description": "10-inch tablet with touchscreen",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

Response:
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "generated-uuid",
    "name": "Tablet",
    "description": "10-inch tablet with touchscreen",
    "price": 300,
    "category": "electronics",
    "inStock": true
  }
}
```

#### 7. Update Product
```bash
PUT /api/products/1
Content-Type: application/json
x-api-key: your-secret-api-key

{
  "name": "Updated Laptop",
  "description": "High-performance laptop with 32GB RAM",
  "price": 1500,
  "category": "electronics",
  "inStock": true
}
```

#### 8. Delete Product
```bash
DELETE /api/products/1
x-api-key: your-secret-api-key
```

#### 9. Search Products
```bash
GET /api/products/search?q=laptop
```

Response:
```json
{
  "query": "laptop",
  "results": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ],
  "count": 1
}
```

#### 10. Get Product Statistics
```bash
GET /api/products/stats
```

Response:
```json
{
  "totalProducts": 3,
  "totalInStock": 2,
  "totalOutOfStock": 1,
  "categories": {
    "electronics": 2,
    "kitchen": 1
  },
  "averagePrice": 683.33,
  "priceRange": {
    "min": 50,
    "max": 1200
  }
}
```

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes:

- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Authentication errors
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

Error response format:
```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "statusCode": 400
}
```

## Middleware Features

1. **Logger Middleware** - Logs all requests with timestamp, method, and URL
2. **Authentication Middleware** - Validates API key for protected routes
3. **Validation Middleware** - Validates product data for creation/updates
4. **Error Handling Middleware** - Global error handling with custom error classes

## Testing the API

You can test the API using:

### cURL Examples

```bash
# Get all products
curl http://localhost:3000/api/products

# Get specific product
curl http://localhost:3000/api/products/1

# Create new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key" \
  -d '{"name":"Tablet","description":"10-inch tablet","price":300,"category":"electronics","inStock":true}'

# Search products
curl "http://localhost:3000/api/products/search?q=laptop"

# Get statistics
curl http://localhost:3000/api/products/stats
```

### Postman Collection

Import the following endpoints into Postman:
- Base URL: `http://localhost:3000`
- Headers: `x-api-key: your-secret-api-key` (for POST, PUT, DELETE)

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)