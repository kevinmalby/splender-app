'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  UserSchema = mongoose.model('User').schema,
  CardSchema = mongoose.model('Card').schema,
  NobleSchema = mongoose.model('Noble').schema;

let PlayerSchema = new Schema({
  user: [UserSchema],
  isAdmin: Boolean,
  purchasedCards: [CardSchema],
  reservedCards: [CardSchema],
  gemTokens: {},
  victoryPoints: Number,
  noblesTaken: [NobleSchema],
  numberOfTurnsTaken: Number,
  numberOfThreeTokenDraws: Number,
  numberOfTwoTokenDraws: Number
});

mongoose.model('Player', PlayerSchema);