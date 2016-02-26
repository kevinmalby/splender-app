'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('./config/mongoose'),
	express = require('./config/express');

let db = mongoose();
let app = express(db);

app.listen(process.env.PORT || 5000);

module.exports = app;

console.log(`Server is running at: \
	http://localhost:${process.env.PORT || 5000}`);