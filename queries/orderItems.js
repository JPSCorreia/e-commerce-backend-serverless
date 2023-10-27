const pool = require('../middleware/pool');
const format = require('pg-format');

// get all order items.
const getAllOrderItems = (request, response) => {
  pool.query(
    `SELECT *
    FROM order_items
    ORDER BY id ASC
    `,
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

// get order items by id.
const getOrderItemsById = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `SELECT *
    FROM order_items
    WHERE id = $1
    `,
    [itemId],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows.length > 0) {
        response.status(200).json(result.rows);
      } else {
        response.sendStatus(204);
      }
    }
  );
};

// add all cart items into an order_items table.
const addOrderItems = (request, response) => {
  const values = request.body;
  pool.query(
    format(
      'INSERT INTO order_items (products_id, order_id, quantity, discount) VALUES %L RETURNING id',
      values
    ),
    [],
    (err, result) => {
      response.status(201).json(result.rows[0].id);
    }
  );
};

// update order item by id.
const updateOrderItem = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `UPDATE order_items
          SET products_id = $1, order_id = $2, quantity = $3
          WHERE id = $4
          `,
    [
      request.body.products_id,
      request.body.order_id,
      request.body.quantity,
      request.params.id,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount > 0) {
        response.status(200).send(`order item UPDATE with id: ${itemId}`);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

// delete order item by id.
const deleteOrderItem = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `DELETE FROM order_items
    WHERE id = $1
    `,
    [itemId],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount > 0) {
        response.status(200).send(`address DELETE with id: ${itemId}`);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

module.exports = {
  getAllOrderItems,
  getOrderItemsById,
  addOrderItems,
  deleteOrderItem,
  updateOrderItem,
};
