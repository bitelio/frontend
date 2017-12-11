'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import info from './info';
import settings from './settings';

export default angular.module('bitelio.account', [uiRouter, info, settings])
  .config(routing)
  .name;
