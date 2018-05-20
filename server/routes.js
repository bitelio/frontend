'use strict';

import path from 'path';
import httpProxy from 'http-proxy';
import env from 'config/environment';

module.exports = function(app) {
  var proxy = httpProxy.createProxyServer({proxyTimeout: 3000});

  app.all('/api/*', (req, res, next) => {
    proxy.web(req, res, {target: env.api}, err => next(err));
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
};
