'use strict';

import angular from 'angular';
import BoardService from './board.service';

export default angular.module('bitelio.components.board', [])
  .service('Board', BoardService)
  .name;
