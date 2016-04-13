'use strict';

const jwt = require('jsonwebtoken'),
  User = require('mongoose').model('User'),
  config = require('../../config/config'),
  errorService = require('../services/error.server.service');

/**
 * Retrieves all of the users in the database and sends this data to the client via json
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.getUsers = function(req, res, next) {
  User.find({})
    .then(users => res.json(users))
    .catch(err => res.send(err));
}

/**
 * Retrieves a user in the database with the given username and sends this data
 * to the client via json
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.getUser = function(req, res, next) {
  User.findById(req.params.username)
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

/**
 * Creates a user and saves it to the database and sends this data to the client via json.
 * This function also authenticates the user after it is created
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.createUser = function(req, res, next) {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  // save the user and check for errors
  newUser.save()
    .then(user => {
      req.body.email = user.username;
      authenticate(req, res, next);
    })
    .catch(err => {
      res.json({
        success: false,
        errors: errorService.getErrors(err)
      });
    });
}

/**
 * Updates the user in the database with the given username and sends this data to the client via json
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.updateUser = function(req, res, next) {
  User.findById(req.params.username)
    .then(user => {
      user = req.body;
      return user.save();
    })
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

/**
 * Deletes a user from the database and sends this data to the client via json
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.deleteUser = function(req, res, next) {
  User.remove({ _id: req.params.username })
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

/**
 * Authenticates a user using the json web token provided in the request object with the
 * jsonwebtoken package.
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
function authenticate(req, res, next) {
  let errorMessage = '';
  User.findOne({ username: req.body.email })
    .then(user => {
      if (!user) {
        res.json({ success: false, errors: ['Authentication failed. User not found.'] });
      } else {
        user.verifyPassword(req.body.password, (err, isMatch) => {
          if (err) {
            res.send(err);
          } else {
            // if user is found and password is right
            // create a token
            if (isMatch) {
              let token = jwt.sign(user, config.jwtSecret, {
                expiresIn: '1d' // expires in 24 hours
              });

              // return the information including token as JSON
              res.json({
                success: true,
                user: { username: user.username, email: user.email, stats: user.stats },
                token: token
              });
            } else {
              res.json({ success: false, errors: ['Authentication failed. Incorrect password.'] });
            }
          }
        });
      }
    })
    .catch(err => res.send(err));
}

exports.authenticate = authenticate;