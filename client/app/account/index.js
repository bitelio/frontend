'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import user from './user';

export default angular.module('bitelio.account', [uiRouter, user])
  .config(routing)
  .name;
