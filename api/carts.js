const express = require('express');
const cartsRouter = express.Router();
const cartQueries = require('../queries/carts');
const checkJwt = require('../middleware/authorization')

// GET request for entire carts table
cartsRouter.get('/', checkJwt, cartQueries.getAllCarts);

// GET request for a single row
cartsRouter.get('/:id', checkJwt, cartQueries.getCartById);

// POST request for adding a new row
//TODO Cart routes probably not needed???
// cartsRouter.post('/', checkJwt, cartQueries.createCart);

// DELETE request for deleting existing row
cartsRouter.delete('/:id', checkJwt, cartQueries.deleteCart);

module.exports = cartsRouter;