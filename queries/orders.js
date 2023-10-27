const pool = require('../middleware/pool');

// get all orders by email
const getAllOrdersByEmail = (request, response) => {
  const email = request.params.email;
  pool.query(
    `SELECT *
    FROM orders
    WHERE user_email = $1
    ORDER BY id DESC
    `,
    [email],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows.length > 0) {
        response.status(200).json(result.rows);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

// get order by id.
const getOrderById = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `SELECT *
    FROM orders
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
        response.sendStatus(404);
      }
    }
  );
};

// get all rows from a table.
const getAllOrderItems = (request, response) => {
  const id = request.params.id;
  pool.query(
    `SELECT *
    FROM products
    JOIN order_items
    ON order_items.products_id = products.id
    WHERE order_items.order_id = $1
    ORDER BY order_items.id ASC
    `,
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows.length > 0) {
        response.status(200).json(result.rows);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

// get total number of orders by user
const getNumberOfOrders = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `SELECT count(*)
    FROM orders
    WHERE user_email = $1
    `,
    [userEmail],
    (error, result) => {
      if (error) {
        throw error;
      }

      if (result.rows[0].count > 0) {
        response.status(200).json(Number(result.rows[0].count));
      } else {
        response.sendStatus(404);
      }
    }
  );
};

// get order month and year by user
const getOrderMonthAndYear = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `SELECT
    RTRIM(TO_CHAR(
      TO_DATE (
        EXTRACT(MONTH FROM created_timestamp)::text, 'MM'), 'Month'
      )) AS "month",
      EXTRACT(YEAR FROM created_timestamp) AS "year"
      FROM orders
      WHERE user_email = $1
      `,
    [userEmail],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows.length > 0) {
        response.status(200).json(result.rows[0]);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

// create new order.
const createOrder = (request, response, next) => {
  pool.query(
    `INSERT INTO orders
          (user_email, total, status, full_name, street_address, city, postcode, phone_number, country)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING id
          `,
    [
      request.body.user_email,
      request.body.total,
      request.body.status,
      request.body.full_name,
      request.body.street_address,
      request.body.city,
      request.body.postcode,
      request.body.phone_number,
      request.body.country,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).json(result.rows[0].id);
    }
  );
};

// update an order.
const updateOrder = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `UPDATE orders
          SET user_email = $1, total = $2, status = $3
          WHERE id = ${itemId}
          `,
    [request.body.user_email, request.body.total, request.body.status],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount > 0) {
        response.status(200).send(`order UPDATE with id: ${itemId}`);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

// delete an order.
const deleteOrder = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `DELETE FROM orders
    WHERE id = $1
    `,
    [itemId],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount > 0) {
        response.status(200).send(`order DELETE with id: ${itemId}`);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

module.exports = {
  getAllOrdersByEmail,
  getOrderById,
  getAllOrderItems,
  createOrder,
  deleteOrder,
  updateOrder,
  getNumberOfOrders,
  getOrderMonthAndYear,
};
