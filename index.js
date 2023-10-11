const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8080;

// configure environment variables.
dotenv.config({ path: `${__dirname}/dev.env` });

// Built-in middleware JSON parser for incoming requests.
app.use(express.json());

// HTTP request logger middleware setup for development use.
app.use(morgan('dev'));

// Mount router for /users
const usersRouter = require('./api/users');
app.use('/api/users', usersRouter);

// Mount router for /products
const productsRouter = require('./api/products');
app.use('/api/products', productsRouter);

// Mount router for /orders
const ordersRouter = require('./api/orders');
app.use('/api/orders', ordersRouter);

// Mount router for /carts
const cartsRouter = require('./api/carts');
app.use('/api/carts', cartsRouter);

// Mount router for /order_items
const orderItemsRouter = require('./api/orderItems');
app.use('/api/order_items', orderItemsRouter);

// Mount router for /orders
const cartItemsRouter = require('./api/cartItems');
app.use('/api/cart_items', cartItemsRouter);

// Mount router for /addresses
const addressesRouter = require('./api/addresses');
app.use('/api/addresses', addressesRouter);

// Mount router for /reviews
const reviewsRouter = require('./api/reviews');
app.use('/api/reviews', reviewsRouter);

// Mount router for /reviews
const orderReviews = require('./api/orderReviews');
app.use('/api/orderReviews', orderReviews);

// // Mount router for /dashboard
// const dashboardRouter = require('./api/dashboard');
// app.use('/api/dashboard', dashboardRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server started. Listening on ${port}:`);
  });
}
module.exports = app;
