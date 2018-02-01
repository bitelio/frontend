'use strict';

import angular from 'angular';
import BoardService from './board.service';
import BoardComponent from './board.component';

export default angular.module('bitelio.components.board', [])
  .service('Board', BoardService)
  .name;
