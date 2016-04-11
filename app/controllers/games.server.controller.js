'use strict';

const mongoose = require('mongoose'),
  Game = mongoose.model('Game'),
  Player = mongoose.model('Player'),
  User = mongoose.model('User'),
  gameService = require('../services/game-service'),
  errorService = require('../services/error-service');

exports.getGames = function(req, res, next) {
  let allGames = [];

  Object.keys(gameService.gamesInPlay).forEach(key => {
    let game = gameService.gamesInPlay[key];
    allGames.push(getGameDescription(game));
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
        game: getGameDescription(newGame)
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

function getGameDescription(game) {
  return {
    name: game.name,
    isPublic: game.isPublic,
    willConvertToPublic: game.willConvertToPublic,
    timeUntilPublic: game.timeUntilPublic,
    minPlayers: game.minPlayers,
    maxPlayers: game.maxPlayers,
    adminPlayer: game.adminPlayer
  }
}