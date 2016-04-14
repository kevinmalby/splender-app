'use strict';

const express = require('express'),
  jwt = require('jsonwebtoken'),
  config = require('./config');

/**
 * Express middleware function which verifies that protected
 * route contains a json web token and that this token matches
 * the one for this user.
 * @param  {Express Router} router [The router that handles all protected routes]
 */
exports.verifyToken = function(router) {

  // route middleware to verify a token
  router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });

    }
  });
}