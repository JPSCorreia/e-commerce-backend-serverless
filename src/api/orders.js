const express = require('express');
const ordersRouter = express.Router();
const orderQueries = require('../queries/orders');
const checkJwt = require('../middleware/authorization');
const allowCors = require('../middleware/allowCors');

// GET request for entire orders table
ordersRouter.get('/get_all/:email', checkJwt, allowCors(orderQueries.getAllOrdersByEmail));

// GET request for a single order
ordersRouter.get('/:id', checkJwt, allowCors(orderQueries.getOrderById));

// GET request for all items from order
ordersRouter.get('/order_products/:id', checkJwt, allowCors(orderQueries.getAllOrderItems));

// GET request for number of orders
ordersRouter.get('/get_number/:email', checkJwt, allowCors(orderQueries.getNumberOfOrders));

// GET request for getting order made date
ordersRouter.get('/get_date/:email', checkJwt, allowCors(orderQueries.getOrderMonthAndYear));

// POST request for adding a new order
ordersRouter.post('/', checkJwt, allowCors(orderQueries.createOrder));

// DELETE request for deleting existing order
ordersRouter.delete('/:id', checkJwt, allowCors(orderQueries.deleteOrder));

// UPDATE request for updating existing order
ordersRouter.put('/:id', checkJwt, allowCors(orderQueries.updateOrder));



module.exports = ordersRouter;