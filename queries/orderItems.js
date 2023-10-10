const pool = require('../middleware/pool');

// get all order items.
const getAllOrderItems = (request, response) => {
  pool.query(
    `SELECT *
    FROM order_items
    ORDER BY id ASC
    `,
    [itemType],
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
      response.status(200).json(result.rows);
    }
  );
};

// add all cart items into an order_items table.
const addOrderItems = (request, response) => {
  const values = request.body;
  pool.query(
    format(
      'INSERT INTO order_items (products_id, order_id, quantity, discount) VALUES %L RETURNING order_id',
      values
    ),
    [],
    (err, result) => {
      response.status(200).json();
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
      response.status(200).send(`ID: ${itemId} DELETED`);
    }
  );
};

// update order item by id.
const updateOrderItem = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `UPDATE ${itemType}
          SET products_id = $1, order_id = $2, quantity = $3
          WHERE id = ${itemId}
          `,
    [request.body.products_id, request.body.order_id, request.body.quantity],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`order item with ID: ${itemId} updated`);
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
