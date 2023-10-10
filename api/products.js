const express = require('express');
const productsRouter = express.Router();
const database = require('../db-controller');


// GET request for entire products table
productsRouter.get('/', async (req, res) => {
  res.json({
    message: 'products route a funcionar',
  });
});

module.exports = productsRouter;