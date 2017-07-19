'use strict';

import path from 'path';
import httpProxy from 'http-proxy';
import errors from './components/errors';
import config from './config/environment';
import * as auth from './auth/auth.service';

export default function(app) {
  var proxy = httpProxy.createProxyServer();

  app.use('/api/users', require('./api/user'));

  app.all('/api/*', auth.isAuthenticated(), (req, res, next) => {
    proxy.web(req, res, {target: config.api}, err => next(err));
  });

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
