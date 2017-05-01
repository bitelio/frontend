'use strict';

import path from 'path';
import httpProxy from 'http-proxy';
import errors from './components/errors';
import config from './config/environment';
//import * as auth from './auth/auth.service';

export default function(app) {
  var apiProxy = httpProxy.createProxyServer();

  app.all('/api/*', (req, res) => {
    apiProxy.web(req, res, {target: config.apiUrl}, err => {
      if(err.code == 'ECONNREFUSED') {
        res.status(504).send({error: 'API not reachable'});
        res.end();
      } else {
        res.status(500).send({error: err});
        res.end();
      }
    });
  });

  app.use('/app/users', require('./app/user'));
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
