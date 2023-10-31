const express = require('express');
const orderReviewsRouter = express.Router();
const orderReviewQueries = require('../queries/orderReviews');
const checkJwt = require('../middleware/authorization')
const allowCors = require('../middleware/allowCors');


// GET request for single review by id
orderReviewsRouter.get('/:user_email/:id', checkJwt, allowCors(orderReviewQueries.getOrderReviewsByEmailAndOrderId));

module.exports = orderReviewsRouter;