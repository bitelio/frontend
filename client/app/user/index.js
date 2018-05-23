'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './user.routes';
import profile from './profile';
import account from './account';

export default angular.module('bitelio.user', [uiRouter, profile, account])
  .config(routing)
  .name;
