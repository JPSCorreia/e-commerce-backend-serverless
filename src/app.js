const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const app = express();


const rateLimit = require('express-rate-limit');

// configure environment variables.
dotenv.config({ path: `${__dirname}/dev.env` });

// Secure app by setting various HTTP headers.
app.use(helmet());

// protects against HTTP Parameter Pollution attacks.
app.use(hpp());

// Built-in middleware JSON parser for incoming requests.
app.use(express.json());
// app.use(express.urlencoded());

// HTTP request logger middleware setup for development use.
app.use(morgan('dev'));

// Limit repeated requests to the API.
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
// });
// app.use(limiter);

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'testing default route',
  });
});

app.get('/test-cors', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send('CORS test successful');
});



// Mount router for /api.
const apiRouter = require('./api/api.js');
app.use('/api', apiRouter);



module.exports = app;


