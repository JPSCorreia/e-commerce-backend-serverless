const express = require('express');
const reviewsRouter = express.Router();
const reviewQueries = require('../queries/reviews');
const checkJwt = require('../middleware/authorization')

// GET request for single review by id
reviewsRouter.get('/:id', checkJwt, reviewQueries.getReviewByProductId);

// GET request for single review by user and id
reviewsRouter.get('/get_review/:user_email/:id', checkJwt, reviewQueries.getReviewByUserAndId)

// POST request for new review.
reviewsRouter.post('/', checkJwt, reviewQueries.createReview);

// PUT request for updating row
reviewsRouter.put('/:id', checkJwt, reviewQueries.updateReview);

// DELETE request for deleting row
reviewsRouter.delete('/:id', checkJwt, reviewQueries.deleteReview);

module.exports = reviewsRouter;