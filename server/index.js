'use strict';

process.env.NODE_PATH = 'server:server/routes';
require('module').Module._initPaths();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test') {
  require('babel-register');
}

exports = module.exports = require('app');
