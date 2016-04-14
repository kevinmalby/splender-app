'use strict';

// Requires the approproate environment configuration (dev, production, etc)
module.exports = require('./env/' + process.env.NODE_ENV + '.js');