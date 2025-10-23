// models/data.js - Data models and sample data

const { v4: uuidv4 } = require('uuid');

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Product model functions
const ProductModel = {
  // Get all products
  getAll: () => products,
  
  // Get product by ID
  getById: (id) => products.find(p => p.id === id),
  
  // Create new product
  create: (productData) => {
    const newProduct = {
      id: uuidv4(),
      name: productData.name.trim(),
      description: productData.description.trim(),
      price: productData.price,
      category: productData.category.trim(),
      inStock: productData.inStock
    };
    products.push(newProduct);
    return newProduct;
  },
  
  // Update product
  update: (id, productData) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) return null;
    
    products[productIndex] = {
      ...products[productIndex],
      name: productData.name.trim(),
      description: productData.description.trim(),
      price: productData.price,
      category: productData.category.trim(),
      inStock: productData.inStock
    };
    return products[productIndex];
  },
  
  // Delete product
  delete: (id) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) return null;
    return products.splice(productIndex, 1)[0];
  },
  
  // Search products
  search: (query) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  // Filter products
  filter: (filters) => {
    let filteredProducts = [...products];
    
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.inStock === filters.inStock
      );
    }
    
    return filteredProducts;
  },
  
  // Get statistics
  getStats: () => {
    const stats = {
      totalProducts: products.length,
      totalInStock: products.filter(p => p.inStock).length,
      totalOutOfStock: products.filter(p => !p.inStock).length,
      categories: {},
      averagePrice: 0,
      priceRange: {
        min: 0,
        max: 0
      }
    };
    
    // Calculate category counts
    products.forEach(product => {
      if (stats.categories[product.category]) {
        stats.categories[product.category]++;
      } else {
        stats.categories[product.category] = 1;
      }
    });
    
    // Calculate price statistics
    if (products.length > 0) {
      const prices = products.map(p => p.price);
      stats.averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      stats.priceRange.min = Math.min(...prices);
      stats.priceRange.max = Math.max(...prices);
    }
    
    return stats;
  }
};

module.exports = {
  products,
  ProductModel
};
