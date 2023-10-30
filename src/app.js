const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const app = express();


const rateLimit = require('express-rate-limit');

// configure environment variables.
dotenv.config({ path: `../${__dirname}/dev.env` });

// Secure app by setting various HTTP headers.
app.use(helmet());

// protects against HTTP Parameter Pollution attacks.
app.use(hpp());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Built-in middleware JSON parser for incoming requests.
app.use(express.json());

// HTTP request logger middleware setup for development use.
app.use(morgan('dev'));

// Limit repeated requests to the API.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
app.use(limiter);

app.get('/', (req, res) => {
  res.json({
    message: 'testing default route',
  });
});

// Mount router for /api.
const apiRouter = require('./api/api.js');
app.use('/api', apiRouter);

module.exports = app;


