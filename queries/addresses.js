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
      response.status(200).json(result.rows);
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
      response
        .status(201)
        .send(`address POST with id: ${result.rows[0].id}`);
    }
  );
};

// delete address by email and products_id
const deleteAddress = (request, response) => {
  const id = parseInt(request.params.id);
  const user_email = request.params.user_email;
  pool.query(
    `DELETE FROM addresses
    WHERE id = $1 AND user_email = $2
    RETURNING id, user_email
    `, [id, user_email], (error, result) => {
      if(error) {
        throw error;
      }
      response.status(200).send(result.rows);
    }
  )
}

// update row from a table by id.
const updateAddress = (request, response) => {
  const itemId = parseInt(request.params.id);
        pool.query (
          `UPDATE ${itemType}
          SET full_name = $1, street_address = $2, city = $3, postcode = $4, phone_number = $5, country = $6
          WHERE id = ${itemId}
          `, [request.body.data.full_name, 
              request.body.data.street_address, 
              request.body.data.city,
              request.body.data.postcode, 
              request.body.data.phone_number, 
              request.body.data.country,
            ], (error, result) => {
            if (error) {
              throw error;
            }
            response.status(200).send(`address UPDATE with id: ${itemId}`)
          }
        )


}

module.exports = {
  getAddressesByEmail,
  createAddress,
  deleteAddress,
  updateAddress,
};
