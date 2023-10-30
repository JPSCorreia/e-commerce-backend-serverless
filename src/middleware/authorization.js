const express = require('express');
const app = express();
const jwksRsa = require('jwks-rsa');
const { expressjwt: jwt } = require("express-jwt");

const dev = (req,res,next) => {
  next();
}

const checkJwt = process.env.IN_DEVELOPMENT? dev : jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://dev-ymfo-vr1.eu.auth0.com/.well-known/jwks.json`
  }),
  audience: `https://dev-ymfo-vr1.eu.auth0.com/api/v2/`,
  issuer: `https://dev-ymfo-vr1.eu.auth0.com/`,
  algorithms: ['RS256']
})


module.exports = checkJwt;