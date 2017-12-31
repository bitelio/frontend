'use strict';

import angular from 'angular';
import LocaleController from './locale.controller';

export default angular.module('bitelio.board.locale', [])
  .controller('LocaleController', LocaleController)
  .name;
