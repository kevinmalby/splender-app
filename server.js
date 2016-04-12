'use strict';

const mongoose = require('./config/mongoose'),
  express = require('./config/express'),
  ioService = require('./config/socket-io');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let db = mongoose();
let app = express(db);
let io = ioService(app);

app.listen(process.env.PORT || 5000);

exports.app = app;
exports.io = io;

console.log(`Server is running at: http://localhost:${process.env.PORT}`);