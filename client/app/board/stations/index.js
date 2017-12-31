'use strict';

import angular from 'angular';
import StationsController from './stations.controller';
import Board from '../../../components/board';

export default angular.module('bitelio.board.stations', [Board])
  .controller('StationsController', StationsController)
  .name;
