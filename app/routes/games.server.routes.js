'use strict';
const games = require('../controllers/games.server.controller');

module.exports = function(router) {
  router.route('/games')
    .get(games.getGames)
    .post(games.createGame);

  router.route('/games/:name')
    .get(games.getGame)
    .delete(games.deleteGame);
};