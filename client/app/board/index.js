'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './board.routes';
import locale from './locale';

export default angular.module('bitelio.board', [uiRouter, locale])
  .config(routing)
  .name;
