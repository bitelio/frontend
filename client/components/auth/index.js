'use strict';

import angular from 'angular';
import util from '../util';
import ngCookies from 'angular-cookies';
import authInterceptor from './auth.interceptor';
import AuthService from './auth.service';

import uiRouter from 'angular-ui-router';

export default angular.module('bitelio.auth', [util, ngCookies, uiRouter])
  .factory('authInterceptor', authInterceptor)
  .service('Auth', AuthService)
  .config(['$httpProvider', $httpProvider => $httpProvider.interceptors.push('authInterceptor')])
  .name;
