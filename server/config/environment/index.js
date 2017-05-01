'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

var all = {
  env: process.env.NODE_ENV,
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 9000,
  root: path.normalize(`${__dirname}/../../..`),
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,
  apiUrl: process.env.KANBAN_API_URL || 'http://localhost:5000',
  secrets: {
    session: 'asdf' // process.env.SESSION_SECRET
  },
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

module.exports = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {}
);
