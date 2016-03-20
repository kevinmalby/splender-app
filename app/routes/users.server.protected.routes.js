'use strict';
const users = require('../controllers/users.server.controller');

module.exports = function(router) {
  router.route('/users')
    .get(users.getUsers);

  router.route('/users/:user_id')
    .get(users.getUser)
    .put(users.updateUser)
    .delete(users.deleteUser);
};