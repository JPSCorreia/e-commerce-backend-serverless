const express = require('express');
const productsRouter = express.Router();
const productQueries = require('../queries/products');
const checkJwt = require('../middleware/authorization');

// GET request for entire products table
productsRouter.get('/', productQueries.getAllProducts);

// GET request for single product by id
productsRouter.get('/:id', productQueries.getProductById);

// POST request for adding a new product
productsRouter.post('/', checkJwt, productQueries.createProduct);

// DELETE request for deleting existing product
productsRouter.delete('/:id', checkJwt, productQueries.deleteProduct);

// UPDATE request for adding existing product stock
productsRouter.put('/add_stock', checkJwt, productQueries.addStock);

// UPDATE request for removing existing product stock
productsRouter.put('/', checkJwt, productQueries.removeStock);

// GET request for products page
productsRouter.get('/page/:page', checkJwt, productQueries.getProductPage);

// GET request for most discounted products
productsRouter.get(
  '/discounted/:number',
  checkJwt,
  productQueries.getMostDiscountedProducts
);

// GET request for total number of products
productsRouter.get('/total/get_number', checkJwt, productQueries.getNumberOfProducts);

// GET request for searching for products
productsRouter.post(
  '/search_products/search',
  checkJwt,
  productQueries.getSearchResults
);

module.exports = productsRouter;
