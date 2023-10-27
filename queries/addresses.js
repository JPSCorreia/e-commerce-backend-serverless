const pool = require('../middleware/pool');

// get all addresses by email.
const getAddressesByEmail = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `SELECT *
    FROM addresses
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

// create new address
const createAddress = (request, response, next) => {
  pool.query(
    `INSERT INTO addresses
          (user_email, full_name, street_address, city, postcode, phone_number, country)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id
          `,
    [
      request.body.data.user_email,
      request.body.data.full_name,
      request.body.data.street_address,
      request.body.data.city,
      request.body.data.postcode,
      request.body.data.phone_number,
      request.body.data.country,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows.length > 0) {
        response.status(201).json(result.rows[0].id);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

// update row from a table by id.
const updateAddress = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `UPDATE addresses
          SET full_name = $1, street_address = $2, city = $3, postcode = $4, phone_number = $5, country = $6
          WHERE id = ${itemId}
          `,
    [
      request.body.data.full_name,
      request.body.data.street_address,
      request.body.data.city,
      request.body.data.postcode,
      request.body.data.phone_number,
      request.body.data.country,
    ],
    (error, result) => {
      if (error) {
        throw error;
      }

      if (result.rowCount > 0) {
        response.status(200).send(`address UPDATE with id: ${itemId}`);
      } else {
        response.sendStatus(404);
      }
    }
  );
};

// delete address by email and products_id
const deleteAddress = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `DELETE FROM addresses
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
  getAddressesByEmail,
  createAddress,
  deleteAddress,
  updateAddress,
};
