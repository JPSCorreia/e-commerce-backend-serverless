const { Pool } = require('pg');

// node-postgres Pool configuration (configures database credentials)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;