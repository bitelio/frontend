'use strict';

import angular from 'angular';
import {BoardService} from './board.service';

export default angular.module('bitelioApp.board')
  .factory('Board', BoardService)
  .name;
