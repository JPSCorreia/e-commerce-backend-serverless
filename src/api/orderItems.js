const express = require('express');
const orderItemsRouter = express.Router();
const orderItemQueries = require('../queries/orderItems');
const checkJwt = require('../middleware/authorization')
const allowCors = require('../middleware/allowCors');

// GET request for entire order_items table
orderItemsRouter.get('/', checkJwt, allowCors(orderItemQueries.getAllOrderItems));

// GET request for a single row
orderItemsRouter.get('/:id', checkJwt, allowCors(orderItemQueries.getOrderItemsById));

// POST request for adding a new row
orderItemsRouter.post('/', checkJwt, allowCors(orderItemQueries.addOrderItems));

// UPDATE request for updating existing row
orderItemsRouter.put('/:id', checkJwt, allowCors(orderItemQueries.updateOrderItem));

// DELETE request for deleting existing row
orderItemsRouter.delete('/:id', checkJwt, allowCors(orderItemQueries.deleteOrderItem));

module.exports = orderItemsRouter;