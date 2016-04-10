'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CardSchema = mongoose.model('Card').schema,
  NobleSchema = mongoose.model('Noble').schema,
  PlayerSchema = mongoose.model('Player').schema;


let GameSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  isPublic: Boolean,
  willConvertToPublic: Boolean,
  timeUntilPublic: Number,
  players: [PlayerSchema],
  adminPlayer: String,
  minPlayers: Number,
  maxPlayers: Number,
  numPlayers: Number,
  playerOrder: [String],
  tierOneCards: [CardSchema],
  tierTwoCards: [CardSchema],
  tierThreeCards: [CardSchema],
  nobles: [NobleSchema],
  gemTokens: {}
});

mongoose.model('Game', GameSchema);