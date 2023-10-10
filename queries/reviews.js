const pool = require('../middleware/pool');

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
      response.status(201).send(`${result.rows[0].id}`);
    }
  );
};

// update a review by id.
const updateReview = (request, response) => {
  const itemId = parseInt(request.params.id);
        pool.query (
          `UPDATE reviews
          SET full_name = $1, comment = $2, rating = $3, image_link = $4
          WHERE id = ${itemId}
          `, [request.body.data.full_name, request.body.data.comment, request.body.data.rating, request.body.data.image_link], (error, result) => {
            if (error) {
              throw error;
            }
            response.status(200).send(`review UPDATE with id: ${itemId}`)
          }
        )

}

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
      response.status(200).json(result.rows[0]);
    }
  );
};

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
      response.status(200).json(result.rows);
    }
  );
};

module.exports = {
  getReviewByUserAndId,
  getReviewByProductId,
  createReview,
  updateReview,
};
