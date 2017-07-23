'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import login from './login';
import settings from './settings';
import reset from './reset';

export default angular.module('bitelioApp.account', [uiRouter, login, settings, reset])
  .config(routing)
  .name;
