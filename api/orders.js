const express = require('express');
const ordersRouter = express.Router();
const orderQueries = require('../queries/orders');
const checkJwt = require('../middleware/authorization')

// GET request for entire orders table
ordersRouter.get('/get_all/:email', checkJwt, orderQueries.getAllOrdersByEmail);

// GET request for a single order
ordersRouter.get('/:id', checkJwt, orderQueries.getOrderById);

// GET request for all items from order
ordersRouter.get('/order_products/:id', checkJwt, orderQueries.getAllOrderItems);

// POST request for adding a new order
ordersRouter.post('/', checkJwt, orderQueries.createOrder);

// DELETE request for deleting existing order
ordersRouter.delete('/:id', checkJwt, orderQueries.deleteOrder);

// UPDATE request for updating existing order
ordersRouter.put('/:id', checkJwt, orderQueries.updateOrder);

// GET request for number of orders
ordersRouter.get('/get_number/:email', checkJwt, orderQueries.getNumberOfOrders);

// GET request for getting order made date
ordersRouter.get('/get_date/:email', checkJwt, orderQueries.getOrderMonthAndYear);

module.exports = ordersRouter;