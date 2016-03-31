'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Card = mongoose.model('Card'),
  Noble = mongoose.model('Noble');

let PlayerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  purchasedCards: [Card],
  reservedCards: [Card],
  gemTokens: {},
  victoryPoints: Number,
  noblesTaken: [Noble],
  numberOfTurnsTaken: Number,
  numberOfThreeTokenDraws: Number,
  numberOfTwoTokenDraws: Number
});

mongoose.model('PlayerSchema', PlayerSchema);