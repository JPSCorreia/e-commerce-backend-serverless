const pool = require('../middleware/pool');

// get the user_name by user id.
const getUsernameById = (request, response) => {
  pool.query(
    `SELECT user_name
    FROM users
    WHERE id = $1
    `,
    [request.user.id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.json(user.rows[0]);
    }
  );
};

// get all user info by email.
const getUserByUsername = (request, response) => {
  const userUsername = request.params.username;
  pool.query(
    `SELECT *
    FROM users
    WHERE email = $1
    `,
    [userUsername],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

// get user registration month and year by email.
const getMonthAndYear = (request, response) => {
  const userEmail = request.params.email;
  pool.query(
    `SELECT
    TO_CHAR(
      TO_DATE (
        EXTRACT(MONTH FROM created_timestamp)::text, 'MM'), 'Month'
      ) AS "month",
      EXTRACT(YEAR FROM created_timestamp) AS "year"
      FROM users
      WHERE email = $1
      `,
    [userEmail],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.json(result.rows[0]);
    }
  );
};

// create new user.
const createUser = (request, response, next) => {
  pool.query(
    `INSERT INTO users
        (email, admin, image_link)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
    [request.body.email, request.body.admin, request.body.image_link],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`user POST with id: ${result.rows[0].id}`);
    }
  );
};

// delete a user.
const deleteUser = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `DELETE FROM users
    WHERE id = $1
    `,
    [itemId],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`user DELETE with id: ${itemId}`);
    }
  );
};

// update a user.
const updateUser = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `UPDATE users
        SET email = $1, admin = $2, image_link = $3
        WHERE id = ${itemId}
        `,
    [request.body.email, request.body.admin, request.body.image_link],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`user UPDATE with id: ${itemId}`);
    }
  );
};

module.exports = {
  getUsernameById,
  getUserByUsername,
  getMonthAndYear,
  createUser,
  deleteUser,
  updateUser,
};
