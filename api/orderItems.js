const express = require('express');
const orderItemsRouter = express.Router();
const orderItemQueries = require('../queries/orderItems');
const checkJwt = require('../middleware/authorization')

// GET request for entire order_items table
orderItemsRouter.get('/', checkJwt, orderItemQueries.getAllOrderItems);

// GET request for a single row
orderItemsRouter.get('/:id', checkJwt, orderItemQueries.getOrderItemsById);

// POST request for adding a new row
orderItemsRouter.post('/', checkJwt, orderItemQueries.addOrderItems);

// UPDATE request for updating existing row
orderItemsRouter.put('/:id', checkJwt, orderItemQueries.updateOrderItem);

// DELETE request for deleting existing row
orderItemsRouter.delete('/:id', checkJwt, orderItemQueries.deleteOrderItem);

module.exports = orderItemsRouter;