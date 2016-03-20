'use strict';
const users = require('../controllers/users.server.controller');

module.exports = function(router) {
  router.route('/authenticate')
    .post(users.authenticate);

  router.route('/users')
    .post(users.createUser);
};