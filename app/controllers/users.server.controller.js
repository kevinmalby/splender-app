'use strict';

const errorService = require('../services/error-service');

const jwt = require('jsonwebtoken'),
  User = require('mongoose').model('User'),
  config = require('../../config/config');


exports.getUsers = function(req, res, next) {
  User.find({})
    .then(users => res.json(users))
    .catch(err => res.send(err));
}

exports.getUser = function(req, res, next) {
  User.findById(req.params.user_id)
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

exports.createUser = function(req, res, next) {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  // TODO: Figure out how to authenticate the user at
  // the same time as login.

  // save the bear and check for errors
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

exports.updateUser = function(req, res, next) {
  User.findById(req.params.user_id)
    .then(user => {
      user = req.body;
      return user.save();
    })
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

exports.deleteUser = function(req, res, next) {
  User.remove({ _id: req.params.user_id })
    .then(user => res.json(user))
    .catch(err => res.send(err));
}

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
                user: { username: user.username, email: user.email },
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