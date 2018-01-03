'use strict';

import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngAnimate from 'angular-animate';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'sortablejs';
import 'angular-legacy-sortablejs-maintained';
import 'angular-bootstrap-toggle-switch';

import routeConfig from './app.config';

import auth from '../components/auth';
import user from '../components/user';
import util from '../components/util';
import board from '../components/board';
import navbar from '../components/navbar';
import notifications from '../components/notifications';
import mainView from './main';
import publicView from './public';
import accountView from './account';
import boardView from './board';
import constants from './app.constants';

import './app.styl';

angular.module('bitelio', [
  ngCookies, ngResource, ngAnimate, uiRouter, uiBootstrap, 'ng-sortable', 'toggle-switch',
  auth, user, util, board, navbar, notifications, constants,
  mainView, publicView, accountView, boardView,
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
