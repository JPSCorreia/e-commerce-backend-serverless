const express = require('express');
const productsRouter = express.Router();
const productQueries = require('../queries/products');
const checkJwt = require('../middleware/authorization');
const allowCors = require('../allowCors');

// GET request for entire products table
productsRouter.get('/', allowCors(productQueries.getAllProducts));

productsRouter.get('/teste', allowCors(productQueries.teste));

// GET request for single product by id
productsRouter.get('/:id', allowCors(productQueries.getProductById));

// GET request for products page
productsRouter.get('/page/:page', checkJwt, allowCors(productQueries.getProductPage));

// GET request for most discounted products
productsRouter.get(
  '/discounted/:number',
  checkJwt,
  allowCors(productQueries.getMostDiscountedProducts
));

// GET request for total number of products
productsRouter.get(
  '/total/get_number',
  checkJwt,
  allowCors(productQueries.getNumberOfProducts
));

// POST request for searching for products
productsRouter.post(
  '/search_products/search',
  checkJwt,
  allowCors(productQueries.getSearchResults
));

// POST request for adding a new product
productsRouter.post('/', checkJwt, allowCors(productQueries.createProduct));

// UPDATE request for adding existing product stock
productsRouter.put('/add_stock', checkJwt, allowCors(productQueries.addStock));

// UPDATE request for removing existing product stock
productsRouter.put('/', checkJwt, allowCors(productQueries.removeStock));

// DELETE request for deleting existing product
productsRouter.delete('/:id', checkJwt, allowCors(productQueries.deleteProduct));

module.exports = productsRouter;
