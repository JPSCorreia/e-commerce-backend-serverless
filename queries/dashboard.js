// const pool = require('../middleware/pool');


// const getUsernameById = (request, response) => {
//   pool.query(
//     `SELECT user_name
//     FROM users
//     WHERE id = $1
//     `, [request.user.id], (error, result) => {
//       if (error) {
//         throw error;
//       }
//     response.json(user.rows[0])
//   })
// };

// module.exports = {
//   getUsernameById
// };