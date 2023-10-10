const express = require('express');
const addressesRouter = express.Router();
const addressQueries = require('../queries/addresses');
const checkJwt = require('../middleware/authorization');

// GET request for all addresses belonging to a user
addressesRouter.get('/:email', checkJwt, addressQueries.getAddressesByEmail);

// POST request for adding a new row
addressesRouter.post('/', checkJwt, addressQueries.createAddress);

// DELETE request for deleting address belonging to a single user
addressesRouter.delete(
  '/delete_address/:user_email/:id',
  checkJwt,
  addressQueries.deleteAddress
);

// PUT request for updating row
addressesRouter.put('/:id', checkJwt, addressQueries.updateAddress);

module.exports = addressesRouter;
