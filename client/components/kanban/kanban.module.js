'use strict';

import angular from 'angular';
import ngCookies from 'angular-cookies';
import {
  KanbanService
} from './kanban.service';
import {
  BoardResource
} from './board.service';

export default angular.module('bitelioApp.kanban', [ngCookies])
  .factory('Kanban', KanbanService)
  .factory('Board', BoardResource)
  .name;
