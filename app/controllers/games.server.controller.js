'use strict';

const mongoose = require('mongoose'),
  Game = mongoose.model('Game'),
  Player = mongoose.model('Player'),
  User = mongoose.model('User'),
  gameState = require('../services/game-state.server.service'),
  errorService = require('../services/error.server.service');

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

exports.getGame = function(req, res, next) {
}

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

exports.deleteGame = function(req, res, next) {
  Game.remove({ name: req.params.name })
    .then(game => res.json(game))
    .catch(err => res.send(err));
}