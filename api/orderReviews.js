const express = require('express');
const orderReviewsRouter = express.Router();
const orderReviewQueries = require('../queries/orderReviews');
const checkJwt = require('../middleware/authorization')


// GET request for single review by id
orderReviewsRouter.get('/:user_email/:id', checkJwt, orderReviewQueries.getOrderReviewsByEmailAndOrderId);

module.exports = orderReviewsRouter;