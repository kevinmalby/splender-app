'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Player = mongoose.model('Player'),
  Card = mongoose.model('Card'),
  Noble = mongoose.model('Noble');

let GameSchema = new Schema({
  players: [Player],
  numPlayers: Number,
  playerOrder: [string],
  tierOneCards: [Card],
  tierTwoCards: [Card],
  tierThreeCards: [Card],
  nobles: [Noble],
  gemTokens: {}
});

mongoose.model('GameSchema', GameSchema);