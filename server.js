'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('./config/mongoose'),
	express = require('./config/express'),
  ioService = require('./app/services/io-service');

let db = mongoose();
let app = express(db);

ioService(app);

app.listen(process.env.PORT || 5000);

module.exports = app;

console.log(`Server is running at: http://localhost:9000`);