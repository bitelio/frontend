'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import Board from '../../components/board';
import routing from './board.routes';
import locale from './locale';
import stations from './stations';

export default angular.module('bitelio.board', [uiRouter, Board, locale, stations])
  .config(routing)
  .name;
