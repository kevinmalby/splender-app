'use strict';

const mongoose = require('mongoose'),
  Game = mongoose.model('Game'),
  Player = mongoose.model('Player'),
  User = mongoose.model('User'),
  gameState = require('../services/game-state.server.service'),
  errorService = require('../services/error.server.service');

/**
 * Retrieves all of the games that are currently in play
 * and sends this data to the client via json
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.getGames = function(req, res, next) {
  let allGames = [];

  Object.keys(gameState.gamesInPlay).forEach(key => {
    let game = gameState.gamesInPlay[key];
    allGames.push(gameState.getGameMetadata(game.name));
  });

  res.json({
    success: true,
    games: allGames
  });
}

/**
 * Retrieves a game with the given name that is currently in play
 * and sends this data to the client via json
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.getGame = function(req, res, next) {
}

/**
 * Creates a new game that will be added to the games currently in play
 * and sends this data to the client via json
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.createGame = function(req, res, next) {
  let newGame = null;
  let adminPlayer = new Player();

  User.findByUsername(req.body.owner)
    .then(user => {
      adminPlayer.isAdmin = true;
      return adminPlayer.user = user
    })
    .then(() => {
      console.log('Admin: ' + req.body.owner);
      return newGame = new Game({
        name: req.body.name,
        isPublic: req.body.isPublic,
        willConvertToPublic: req.body.willConvertToPublic,
        timeUntilPublic: req.body.timeUntilPublic,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        adminPlayer: req.body.owner,
        players: [adminPlayer]
      });
    })
    .then(() => {
      return gameState.AddNewGame(newGame);
    })
    .then(() => {
      return res.json({
        success: true,
        game: gameState.getGameMetadata(newGame.name)
      });
    })
    .catch(err => {
      res.json({
        success: false,
        errors: errorService.getErrors(err)
      });
    });
}

/**
 * Deletes a game with the given name and removes it from the games that are currently in play
 * and sends the deleted game data to the client via json
 * @param  {HTTP Request Object}   req  [Contains all of the request information and functionality]
 * @param  {HTTP Response Object}   res  [Contains the response information and functionality]
 * @param  {Function} next [Relinquishes control to the next function in the pipeline]
 */
exports.deleteGame = function(req, res, next) {
}