const express = require('express');
const addressesRouter = express.Router();
const addressQueries = require('../queries/addresses');
const checkJwt = require('../middleware/authorization');
const allowCors = require('../middleware/allowCors');

// GET request for all addresses belonging to a user
addressesRouter.get('/:email', checkJwt, allowCors(addressQueries.getAddressesByEmail));

// POST request for adding a new row
addressesRouter.post('/', checkJwt, allowCors(addressQueries.createAddress));

// PUT request for updating row
addressesRouter.put('/:id', checkJwt, allowCors(addressQueries.updateAddress));

// DELETE request for deleting address belonging to a single user
addressesRouter.delete('/:id', checkJwt, allowCors(addressQueries.deleteAddress));

module.exports = addressesRouter;
