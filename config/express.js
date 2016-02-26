'use strict';

const config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	http = require('http'),
	socketio = require('socket.io');

module.exports = function(db) {

	// Initialize the express app
	let app = express();
	let server = http.createServer(app);
	let io = socketio.listen(server);

	// Use morgan logger if in the dev environment
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	// views is directory for all template files
	app.set('views', './app/views');
	app.set('view engine', 'hbs');

	// Require the routing files
	require('../app/routes/index.server.routes')(app);

	// Tell express where to serve to serve the static
	// files from
	app.use(express.static('./public'));

	return server;
};