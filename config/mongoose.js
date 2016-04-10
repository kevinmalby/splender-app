'use strict';

const config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	let db = mongoose.connect(config.db);

	// This section is where we require all
	// of the models we define for the project
  require('../app/models/user.server.model');
  require('../app/models/card.server.model');
  require('../app/models/noble.server.model');
  require('../app/models/player.server.model');
  require('../app/models/game.server.model');

	return db;
};