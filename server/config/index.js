'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import raven from 'raven';
import shrinkRay from 'shrink-ray';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import lusca from 'lusca';
import env from './environment';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
var MongoStore = connectMongo(session);

module.exports = function(app) {
  var mode = app.get('env');

  raven.config(env.sentry).install();
  app.use(raven.requestHandler());

  if(mode === 'development' || mode === 'test') {
    app.use(express.static(path.join(env.root, '.tmp')));
  }

  if(mode === 'production') {
    app.use(favicon(path.join(env.root, 'client', 'favicon.ico')));
  }

  app.set('appPath', path.join(env.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.set('views', `${env.root}/server/views`);
  app.set('view engine', 'pug');
  app.use(shrinkRay());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  app.use(session({
    secret: env.secret,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'bitelio'
    })
  }));

  if(mode !== 'test' && !process.env.SAUCE_USERNAME) {
    app.use(lusca({
      csrf: {
        angular: true
      },
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, //1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }

  if(mode === 'development') {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const stripAnsi = require('strip-ansi');
    const webpack = require('webpack');
    const makeWebpackConfig = require('../../webpack.make');
    const webpackConfig = makeWebpackConfig({ DEV: true });
    const compiler = webpack(webpackConfig);
    const browserSync = require('browser-sync').create();

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
    browserSync.init({
      open: false,
      logFileChanges: false,
      proxy: `localhost:${env.port}`,
      ws: true,
      middleware: [
        webpackDevMiddleware(compiler, {
          noInfo: false,
          stats: {
            colors: true,
            timings: true,
            chunks: false
          }
        })
      ],
      port: env.browserSyncPort,
      plugins: ['bs-fullscreen-message']
    });

    /**
     * Reload all devices when bundle is complete
     * or send a fullscreen error message to the browser instead
     */
    compiler.plugin('done', function(stats) {
      console.log('webpack done hook');
      if(stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stripAnsi(stats.toString()),
          timeout: 100000
        });
      }
      browserSync.reload();
    });
  }
};
