'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let NobleSchema = new Schema({
  victoryPointValue: Number,
  resourceRequirements: {},
});

mongoose.model('Noble', NobleSchema);