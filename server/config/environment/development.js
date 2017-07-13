'use strict';
/*eslint no-process-env:0*/

module.exports = {
  port: 9000,
  api: 'http://localhost:5000',
  secrets: {
    session: 'xxxXXXxxx'
  },
  mongo: {
    uri: 'mongodb://localhost/bitelio',
    options: {
      db: {
        safe: true
      }
    }
  }
};
