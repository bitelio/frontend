'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './board.routes';
import settings from './settings';

export default angular.module('bitelioApp.board', [uiRouter, settings])
  .config(routing)
  .name;
