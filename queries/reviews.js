const pool = require('../middleware/pool');

// get review by id.
const getReviewByProductId = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `SELECT *
    FROM reviews
    WHERE products_id = $1
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

// get review by id and email.
const getReviewByUserAndId = (request, response) => {
  const id = parseInt(request.params.id);
  const email = request.params.user_email;
  pool.query(
    `SELECT *
    FROM reviews
    WHERE products_id = $1 AND user_email = $2
    `,
    [id, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount > 0) {
        response.status(200).json(result.rows[0]);
      } else {
        response.sendStatus(204);
      }
    }
  );
};

// create a new review.
const createReview = (request, response, next) => {
  pool.query(
    `INSERT INTO reviews
          (products_id, user_email, full_name, comment, rating, image_link)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
          `,
    [
      request.body.data.products_id,
      request.body.data.user_email,
      request.body.data.full_name,
      request.body.data.comment,
      request.body.data.rating,
      request.body.data.image_link,
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

// update a review by id.
const updateReview = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `UPDATE reviews
          SET full_name = $1, comment = $2, rating = $3, image_link = $4
          WHERE id = $5
          `,
    [
      request.body.data.full_name,
      request.body.data.comment,
      request.body.data.rating,
      request.body.data.image_link,
      request.params.id
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

// delete a review by id.
const deleteReview = (request, response) => {
  const itemId = parseInt(request.params.id);
  pool.query(
    `DELETE FROM reviews
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
  getReviewByUserAndId,
  getReviewByProductId,
  createReview,
  updateReview,
  deleteReview
};
