'use strict';

const config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	let db = mongoose.connect(config.db);

	// This section is where we require all
	// of the models we define for the project
  require('../app/models/user.server.model');

	return db;
};