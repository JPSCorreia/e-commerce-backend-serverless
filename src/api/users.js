const express = require('express');
const usersRouter = express.Router();
const userQueries = require('../queries/users');
const checkJwt = require('../middleware/authorization');
const allowCors = require('../middleware/allowCors');

// GET request test for vercel
// usersRouter.get('/teste/teste', (req, res) => {
//   res.json({
//     message: 'users route a funcionar',
//   });
// });

// GET request for single user by username
usersRouter.get('/:username', allowCors(userQueries.getUserByUsername));

// GET request for getting user register date
usersRouter.get('/get_date/:email', checkJwt, allowCors(userQueries.getMonthAndYear));

// POST request for adding a new user
usersRouter.post('/', checkJwt, allowCors(userQueries.createUser));

// UPDATE request for updating existing user
usersRouter.put('/:id', checkJwt, allowCors(userQueries.updateUser));

// DELETE request for deleting existing user
usersRouter.delete('/:id', checkJwt, allowCors(userQueries.deleteUser));

module.exports = usersRouter;
