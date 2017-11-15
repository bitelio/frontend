'use strict';
/*eslint no-process-env:0*/

module.exports = {
  port: 80,
  api: 'http://api',
  secret: process.env.SESSION_SECRET,
  mongo: {
    uri: 'mongodb://mongo/bitelio',
    options: {
      db: {
        safe: true
      }
    }
  }
};
