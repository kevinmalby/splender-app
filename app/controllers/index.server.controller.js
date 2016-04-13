'use strict';

var path = require('path');

/**
 * Route to the index page which serves the index file
 * @param  {HTTP Request Object} req [Contains all of the request information and functionality]
 * @param  {HTTP Response Object} res [Contains all of the response information and functionality]
 */
exports.render = function(req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../../public/src') });
};