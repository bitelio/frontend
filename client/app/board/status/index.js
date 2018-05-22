'use strict';

import angular from 'angular';
import StatusController from './status.controller';
import Board from '../../../components/board';

export default angular.module('bitelio.board.status', [Board])
  .controller('StatusController', StatusController)
  .name;

