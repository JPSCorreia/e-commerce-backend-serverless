const pool = require('../middleware/pool');

// get all carts.
const getAllCarts = (request, response) => {
  pool.query(
    `SELECT *
    FROM carts
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

// get a cart by id.
const getCartById = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `SELECT *
    FROM carts
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

// delete a cart.
const deleteCart = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `DELETE FROM carts
    WHERE id = $1
    `,
    [itemId],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`cart DELETE with id: ${itemId}`);
    }
  );
};


module.exports = {
  getAllCarts,
  getCartById,
  deleteCart,
};
