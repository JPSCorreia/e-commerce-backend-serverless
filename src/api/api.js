const express = require('express');
const apiRouter = express.Router();

// Mount router for /users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// Mount router for /products
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

// Mount router for /orders
const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

// Mount router for /order_items
const orderItemsRouter = require('./orderItems');
apiRouter.use('/order_items', orderItemsRouter);

// Mount router for /orders
const cartItemsRouter = require('./cartItems');
apiRouter.use('/cart_items', cartItemsRouter);

// Mount router for /addresses
const addressesRouter = require('./addresses');
apiRouter.use('/addresses', addressesRouter);

// Mount router for /reviews
const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);

// Mount router for /reviews
const orderReviews = require('./orderReviews');
apiRouter.use('/orderReviews', orderReviews);

module.exports = apiRouter;