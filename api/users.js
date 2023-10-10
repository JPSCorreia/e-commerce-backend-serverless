const express = require('express');
const usersRouter = express.Router();
const userQueries = require('../queries/users');
const checkJwt = require('../middleware/authorization');

// testing GET request for users
// usersRouter.get('/', checkJwt, async (req, res) => {
//   res.json({
//     message: 'users route a funcionar',
//   });
// });

// GET request for single user by username
usersRouter.get('/:username', userQueries.getUserByUsername);

// POST request for adding a new user
usersRouter.post('/', checkJwt, userQueries.createUser);

// DELETE request for deleting existing user
usersRouter.delete('/:id', checkJwt, userQueries.deleteUser);

// UPDATE request for updating existing user
usersRouter.put('/:id', checkJwt, userQueries.updateUser);

// GET request for getting user register date
usersRouter.get('/get_date/:email', checkJwt, userQueries.getMonthAndYear);

module.exports = usersRouter;
