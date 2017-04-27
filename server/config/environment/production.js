'use strict';
/*eslint no-process-env:0*/

module.exports = {
  ip: process.env.ip || undefined,
  port: process.env.PORT || 8080,
  mongo: {
    uri: process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/bitelio'
  }
};
