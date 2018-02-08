'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './dashboard.routes';
import delivery from './delivery';

export default angular.module('bitelio.dashboard', [uiRouter, delivery, delivery])
  .config(routing)
  .name;
