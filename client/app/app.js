'use strict';

import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngAnimate from 'angular-animate';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import routeConfig from './app.config';

import auth from '../components/auth';
import user from '../components/user';
import util from '../components/util';
import navbar from '../components/navbar';
import notifications from '../components/notifications';
import main from './main';
import publik from './public';
import account from './account';
import constants from './app.constants';

import './app.styl';

angular.module('bitelio', [
  ngCookies, ngResource, ngAnimate, uiRouter, uiBootstrap,
  auth, user, main, publik, account, navbar, notifications,
  constants, util
]).config(routeConfig)
  .run(($rootScope, $location, Auth) => {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if(!next.public && !Auth.ready) {
        $location.path('/login');
      }
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['bitelio'], {
      strictDi: true
    });
  });
