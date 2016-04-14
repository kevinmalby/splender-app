'use strict';

const config = require('./config'),
	express = require('express'),
	http = require('http'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	routerMiddleware = require('./express-router-middleware'),
	apiRoutes = express.Router();

module.exports = function(db) {

	// Initialize the express app
	let app = express();
	let server = http.createServer(app);

	let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
	};

	// Use morgan logger if in the dev environment
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	// views is directory for all template files
	app.set('views', './app/views');
	app.set('view engine', 'hbs');

	// Body Parser parses url parameters and makes them
	// easily available to us in the request body parameter
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// Allows for cross origin
	app.use(allowCrossDomain);

	// Require the index route
	require('../app/routes/index.server.routes')(app);

	// require the open user routes
	require('../app/routes/users.server.open.routes')(apiRoutes);

	// Middleware that will verify access tokens
	// when a user tries to sign up
	routerMiddleware.verifyToken(apiRoutes);

	// Require the protected api routes
	require('../app/routes/users.server.protected.routes')(apiRoutes);
	require('../app/routes/games.server.routes')(apiRoutes);

	// Register the user router with the express app
	app.use('/api', apiRoutes);

	// Tell express where to serve to serve the static
	// files from
	app.use(express.static('./public'));

	return server;
};