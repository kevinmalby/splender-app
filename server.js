'use strict';

const mongoose = require('./config/mongoose'),
  express = require('./config/express'),
  ioService = require('./app/services/io-service');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let db = mongoose();
let app = express(db);

ioService(app);

app.listen(process.env.PORT || 5000);

module.exports = app;

console.log(`Server is running at: http://localhost:9000`);