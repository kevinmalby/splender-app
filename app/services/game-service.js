'use strict';

const cards = require('../../data/card-data.json'),
  nobles = require('../../data/noble-data.json'),
  mongoose = require('mongoose'),
  Card = mongoose.model('Card'),
  Noble = mongoose.model('Noble'),
  Player = mongoose.model('Player');

var gamesInPlay = {};

exports.AddNewGame = function AddNewGame(newGame) {
  console.log('adding new game...');
  if (newGame) {
    initializeCards(newGame);
    initializeNobles(newGame);
    initializeGemTokens(newGame);
    gamesInPlay[newGame.name] = newGame;
    return newGame;
  }
}

let initializeCards = function(game) {
  for (let tier = 1; tier < 4; tier++) {
    let curTierString = `tier${numToWord(tier)}Cards`;
    let curTier = cards[curTierString];

    for (let i = 0; i < curTier.length; i++) {
      let curCard = curTier[i];
      game[curTierString].push(new Card({
        gemResource: curCard.resource,
        victoryPointValue: curCard.points,
        cost: curCard.cost,
        tier: tier
      }));
    }
  }
}

let initializeNobles = function(game) {
  for (let i = 0; i < nobles.length; i++) {
    let curNoble = nobles[i];
    game.nobles.push(new Noble({
      victoryPointValue: curNoble.victoryPointValue,
      resourceRequirements: curNoble.resourceRequirements
    }));
  }
}

let initializeGemTokens = function(game) {
  game.gemTokens = {'Diamond':8, 'Sapphire': 8, 'Emerald': 8, 'Ruby': 8, 'Onyx': 8};
}

let numToWord = function(num) {
  switch(num) {
    case 0:
      return 'Zero';
    case 1:
      return 'One';
    case 2:
      return 'Two';
    case 3:
      return 'Three';
  }
}
