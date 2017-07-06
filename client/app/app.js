'use strict';

import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import main from './main';
import account from './account';
import navbar from '../components/navbar/navbar.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.styl';

angular.module('bitelioApp', [ngCookies, ngResource, uiRouter, uiBootstrap, 'frapontillo.bootstrap-switch', _Auth, main, account, navbar, constants, util])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['bitelioApp'], {
      strictDi: true
    });
  });
