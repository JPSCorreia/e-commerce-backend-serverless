const express = require('express');
const usersRouter = express.Router();
const userQueries = require('../queries/users');
const checkJwt = require('../middleware/authorization');

// GET request test for vercel
usersRouter.get('/teste/teste', (req, res) => {
  res.json({
    message: 'users route a funcionar',
  });
});

// GET request for single user by username
usersRouter.get('/:username', userQueries.getUserByUsername);

// GET request for getting user register date
usersRouter.get('/get_date/:email', checkJwt, userQueries.getMonthAndYear);

// POST request for adding a new user
usersRouter.post('/', checkJwt, userQueries.createUser);

// UPDATE request for updating existing user
usersRouter.put('/:id', checkJwt, userQueries.updateUser);

// DELETE request for deleting existing user
usersRouter.delete('/:id', checkJwt, userQueries.deleteUser);

module.exports = usersRouter;
