'use strict';

import path from 'path';
import httpProxy from 'http-proxy';
import env from 'config/environment';
import {isAuthenticated} from './auth/auth.service';

module.exports = function(app) {
  var proxy = httpProxy.createProxyServer();

  app.use('/api/user', require('./user'));

  app.use('/api/auth', require('./auth'));

  app.all('/api/*', isAuthenticated(), (req, res, next) => {
    proxy.web(req, res, {target: env.api}, err => next(err));
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
};
