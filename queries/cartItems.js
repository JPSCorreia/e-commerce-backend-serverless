const pool = require('../middleware/pool');

// get all cart items.
const getAllCartItems = (request, response) => {
  pool.query(
    `SELECT *
    FROM cart_items
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

// get all cart items by email.
const getCartByEmail = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `SELECT *
    FROM cart_items
    WHERE user_email = $1 
    `,
    [userEmail],
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

// get cart item by email and product id.
const getCartByEmailAndProductId = (request, response) => {
  const authenticatedEmail = request.params.email;
  const id = parseInt(request.params.products_id);
  pool.query(
    `SELECT *
    FROM cart_items
    WHERE user_email = $1 AND products_id = $2
    `,
    [authenticatedEmail, id],
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

// get sum of the price of all items in cart_items belonging to a single user.
const getTotalPriceByEmail = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `SELECT SUM((price - (price * discount/100)) * quantity)
    FROM cart_items
    JOIN products
    ON cart_items.products_id = products.id
    WHERE user_email = $1;
    `,
    [userEmail],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows[0].sum == null) {
        response.sendStatus(204);
      } else {
        response.status(200).json(result.rows);
      }
    }
  );
};

// get product details for all items in cart_items.
const getCartProductsByEmail = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `SELECT products.id, products.name, price, description, quantity, image_link, discount
    FROM products
    JOIN cart_items
    ON cart_items.products_id = products.id
    WHERE cart_items.user_email = $1
    ORDER BY products.id
    `,
    [userEmail],
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

// get sum of the total quantity of items in cart_items belonging to a single user.
const getItemTotalByEmail = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `SELECT SUM(quantity)
    FROM cart_items
    WHERE user_email = $1;
    `,
    [userEmail],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows[0].sum == null) {
        response.sendStatus(204);
      } else {
        response.status(200).json(result.rows);
      }
    }
  );
};

// create new cart item.
const createCartItem = (request, response, next) => {
  pool.query(
    `INSERT INTO cart_items
          (products_id, user_email, quantity)
          VALUES ($1, $2, $3)
          RETURNING id
          `,
    [request.body.products_id, request.body.user_email, request.body.quantity],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).json(result.rows[0].id);
    }
  );
};

// add quantity to cart item by product id.
const addQuantity = (request, response) => {
  const productsId = parseInt(request.body.products_id)
  const quantity = parseInt(request.body.quantity)
  const email = request.body.user_email
  pool.query(`
    UPDATE cart_items
    SET quantity = (quantity + $1)
    WHERE user_email = $3 AND products_id = $2
  `, [quantity, productsId, email], (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  )
}

// remove quantity from cart item by product id.
const removeQuantity = (request, response) => {
  const productsId = parseInt(request.body.products_id)
  const quantity = parseInt(request.body.quantity)
  const email = request.body.user_email
  pool.query(`
    UPDATE cart_items
    SET quantity = (quantity - $1)
    WHERE user_email = $3 AND products_id = $2
  `, [quantity, productsId, email], (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  )
}

// delete cart item by products_id
const deleteCartItem = (request, response) => {
  const products_id = parseInt(request.params.products_id);
  const user_email = request.params.user_email;
  pool.query(
    `DELETE FROM cart_items
    WHERE products_id = $1 AND user_email = $2
    RETURNING id, products_id, user_email, quantity
    `, [products_id, user_email], (error, result) => {
      if(error) {
        throw error;
      }
      if (result.rowCount > 0) {
        response.status(200).send(`address DELETE with products_id: ${products_id}`);
      } else {
        response.sendStatus(404);
      }
    }
  )
}

// remove all cart_items belonging to a single user.
const deleteAllFromCart = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `DELETE FROM cart_items
    WHERE user_email = $1
    `, [userEmail], (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send('removed cart items');
  })
};



module.exports = {
  getAllCartItems,
  getCartByEmail,
  getCartByEmailAndProductId,
  getCartProductsByEmail,
  getTotalPriceByEmail,
  getItemTotalByEmail,
  createCartItem,
  deleteCartItem,
  deleteAllFromCart,
  addQuantity,
  removeQuantity,
};
