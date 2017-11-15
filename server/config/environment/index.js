'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

var defaults = {
  env: process.env.NODE_ENV,
  ip: process.env.IP || '0.0.0.0',
  root: path.normalize(`${__dirname}/../../..`),
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,
  sentry: process.env.SENTRY_DSN,
  sendgrid: process.SENDGRID,
};

module.exports = _.merge(
  defaults,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {}
);
