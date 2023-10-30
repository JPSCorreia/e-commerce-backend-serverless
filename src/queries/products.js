const pool = require('../middleware/pool');

// get all products.
const getAllProducts = (request, response) => {
  pool.query(
    `SELECT *
    FROM products
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

const teste = (request, response) => {
return { "teste": "teste"}
};


// get product by id.
const getProductById = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `SELECT *
    FROM products
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
        response.status(404).send();
      }
    }
  );
};

// create a new product.
const createProduct = (request, response, next) => {
  pool.query(
    `INSERT INTO products
          (name, price, description, stock, image_link, discount)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
          `,
    [
      request.body.name,
      request.body.price,
      request.body.description,
      request.body.stock,
      request.body.image_link,
      request.body.discount,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).json(result.rows[0].id);
    }
  );
};

// delete row from table by id.
const deleteProduct = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `DELETE FROM products
    WHERE id = $1
    `,
    [itemId],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`product DELETE with id: ${itemId}`);
    }
  );
};

// add stock to product by product id.
const addStock = (request, response) => {
  const productsId = parseInt(request.body.products_id);
  const quantity = parseInt(request.body.quantity);
  pool.query(
    `
      UPDATE products
      SET stock = (stock + $1)
      WHERE products.id = $2
  `,
    [quantity, productsId],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

// remove stock from product by product id.
const removeStock = (request, response) => {
  const productsId = parseInt(request.body.products_id);
  const quantity = parseInt(request.body.quantity);
  pool.query(
    `
      UPDATE products
      SET stock = (stock - $1)
      WHERE products.id = $2
  `,
    [quantity, productsId],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

// get all products from a page.
const getProductPage = (request, response) => {
  const page = request.params.page;
  if (page > 0) {
    pool.query(
      `SELECT *
      FROM products
      ORDER BY id ASC
      LIMIT 9 OFFSET ((9*$1)-9)
      `,
      [page],
      (error, result) => {
        if (error) {
          throw error;
        }

        if (result.rows.length > 0) {
          response.status(200).json(result.rows);
        } else {
          response.status(404).send();
        }
      }
    );
  }
  if (page == 0) {
    response.status(404).send();
  }
};

// get the most discounted products.
const getMostDiscountedProducts = (request, response) => {
  const number = parseInt(request.params.number);
  pool.query(
    `SELECT *
    FROM products
    ORDER BY discount DESC
    LIMIT $1
    `,
    [number],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

// get total number of products.
const getNumberOfProducts = (request, response) => {
  pool.query(
    `SELECT COUNT (*)
    FROM products
    `,
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows[0].count);
    }
  );
};

// get search results.
const getSearchResults = (request, response) => {
  // putting search string into an array and capitalizing first letter
  const searchParam = request.body.search;
  const searchParamCap = searchParam.split(' ');

  // creating search query
  let searchString = '';
  searchParamCap.forEach((word, index) => {
    if (index === 0) {
      searchString =
        searchString +
        `SELECT * FROM products WHERE LOWER(name) LIKE '%${word}%' OR LOWER(description) LIKE '%${word}%'`;
    } else {
      searchString =
        searchString +
        ` UNION SELECT * FROM products WHERE LOWER(name) LIKE '%${word}%' OR LOWER(description) LIKE '%${word}%'`;
    }
  });
  pool.query(searchString, (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  addStock,
  removeStock,
  getProductPage,
  getMostDiscountedProducts,
  getNumberOfProducts,
  getSearchResults,
  teste,
};
