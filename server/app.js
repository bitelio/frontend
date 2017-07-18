'use strict';

import express from 'express';
import mongoose from 'mongoose';
import raven from 'raven';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Error handlers
app.use(raven.errorHandler());
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message});
});

// Start server
function startServer() {
  app.bitelio = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
