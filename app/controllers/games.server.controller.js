'use strict';

const mongoose = require('mongoose'),
  Game = mongoose.model('Game'),
  Player = mongoose.model('Player'),
  User = mongoose.model('User'),
  gameService = require('../services/game-service'),
  errorService = require('../services/error-service');

exports.getGames = function(req, res, next) {
  Game.find({})
    .then(games => res.json(games))
    .catch(err => res.send(err));
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
      return gameService.AddNewGame(newGame);
    })
    .then(() => {
      res.json({
        success: true,
        game: {
          name: newGame.name,
          isPublic: newGame.isPublic,
          willConvertToPublic: newGame.willConvertToPublic,
          timeUntilPublic: newGame.timeUntilPublic,
          minPlayers: newGame.minPlayers,
          maxPlayers: newGame.maxPlayers,
          adminPlayer: newGame.adminPlayer
        }
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