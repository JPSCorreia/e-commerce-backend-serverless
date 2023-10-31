const express = require('express');
const cartItemsRouter = express.Router();
const cartItemQueries = require('../queries/cartItems');
const checkJwt = require('../middleware/authorization');
const allowCors = require('../middleware/allowCors');


// GET request for entire cart_items table
cartItemsRouter.get('/', checkJwt, allowCors(cartItemQueries.getAllCartItems));

// GET request for all cart items belonging to a user
cartItemsRouter.get('/:email', checkJwt, allowCors(cartItemQueries.getCartByEmail));

// GET request for of single row by Email
cartItemsRouter.get('/get_cart/:email/:products_id', checkJwt, allowCors(cartItemQueries.getCartByEmailAndProductId));

// GET request for price of all cart items belonging to a user
cartItemsRouter.get('/total_price/:email', checkJwt, allowCors(cartItemQueries.getTotalPriceByEmail));

// GET request for all products in cart belonging to a user
cartItemsRouter.get('/cart_products/:email', checkJwt, allowCors(cartItemQueries.getCartProductsByEmail));

// GET request for number of cart items belonging to a user
cartItemsRouter.get('/total_number/:email', checkJwt, allowCors(cartItemQueries.getItemTotalByEmail));

// POST request for adding a new row
cartItemsRouter.post('/', checkJwt, allowCors(cartItemQueries.createCartItem));

// PUT request to update quantity of product by user email product id
cartItemsRouter.put('/', checkJwt, allowCors(cartItemQueries.addQuantity));

// PUT request to update quantity of product by user email product id
cartItemsRouter.put('/remove_quantity', checkJwt, allowCors(cartItemQueries.removeQuantity));

// DELETE request for deleting existing row
cartItemsRouter.delete('/delete_item/:user_email/:products_id', checkJwt, allowCors(cartItemQueries.deleteCartItem));

// DELETE request for deleting all cart items belonging to a single user
cartItemsRouter.delete('/delete_cart/:email', allowCors(cartItemQueries.deleteAllFromCart));

module.exports = cartItemsRouter;