const express = require('express');
const productsRouter = express.Router();
const productQueries = require('../queries/products');
const checkJwt = require('../middleware/authorization');
const allowCors = require('../allowCors');

// GET request for entire products table
productsRouter.get('/', productQueries.getAllProducts);

productsRouter.get('/teste', productQueries.teste);

// GET request for single product by id
productsRouter.get('/:id', productQueries.getProductById);

// GET request for products page
productsRouter.get('/page/:page', checkJwt, productQueries.getProductPage);

// GET request for most discounted products
productsRouter.get(
  '/discounted/:number',
  checkJwt,
  productQueries.getMostDiscountedProducts
);

// GET request for total number of products
productsRouter.get(
  '/total/get_number',
  checkJwt,
  productQueries.getNumberOfProducts
);

// POST request for searching for products
productsRouter.post(
  '/search_products/search',
  checkJwt,
  productQueries.getSearchResults
);

// POST request for adding a new product
productsRouter.post('/', checkJwt, productQueries.createProduct);

// UPDATE request for adding existing product stock
productsRouter.put('/add_stock', checkJwt, productQueries.addStock);

// UPDATE request for removing existing product stock
productsRouter.put('/', checkJwt, productQueries.removeStock);

// DELETE request for deleting existing product
productsRouter.delete('/:id', checkJwt, productQueries.deleteProduct);

module.exports = productsRouter;
