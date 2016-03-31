'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let CardSchema = new Schema({
  gemResource: String,
  victoryPointValue: Number,
  cost: {},
  tier: Number
});

mongoose.model('Card', CardSchema);