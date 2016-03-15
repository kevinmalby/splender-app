'use strict';

var path = require('path');

exports.render = function(req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../../public/src') });
};