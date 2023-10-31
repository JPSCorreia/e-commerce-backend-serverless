const express = require('express');
const reviewsRouter = express.Router();
const reviewQueries = require('../queries/reviews');
const checkJwt = require('../middleware/authorization');
const allowCors = require('../middleware/allowCors');

// GET request for single review by id
reviewsRouter.get('/:id', checkJwt, allowCors(reviewQueries.getReviewByProductId));

// GET request for single review by user and id
reviewsRouter.get('/get_review/:user_email/:id', checkJwt, allowCors(reviewQueries.getReviewByUserAndId));

// POST request for new review.
reviewsRouter.post('/', checkJwt, allowCors(reviewQueries.createReview));

// PUT request for updating row
reviewsRouter.put('/:id', checkJwt, allowCors(reviewQueries.updateReview));

// DELETE request for deleting row
reviewsRouter.delete('/:id', checkJwt, allowCors(reviewQueries.deleteReview));

module.exports = reviewsRouter;