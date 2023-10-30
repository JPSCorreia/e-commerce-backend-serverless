const pool = require('../middleware/pool');

// get order reviews by order id.
const getOrderReviewsByEmailAndOrderId = (request, response) => {
  const orderId = parseInt(request.params.id);
  const email = request.params.user_email;
  pool.query(
    `SELECT reviews.id, reviews.products_id, reviews.user_email, reviews.full_name, reviews.comment, reviews.rating, reviews.image_link
    FROM reviews
    JOIN order_items
    ON reviews.products_id = order_items.products_id
    WHERE order_id = $1 AND user_email = $2
    `,
    [orderId, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rowCount > 0) {
        response.status(200).json(result.rows);
      } else {
        response.sendStatus(204);
      }
    }
  );
};

module.exports = {
  getOrderReviewsByEmailAndOrderId
};