'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import login from './login';
import user from './user';
import reset from './reset';

export default angular.module('bitelio.account', [uiRouter, login, user, reset])
  .config(routing)
  .name;
