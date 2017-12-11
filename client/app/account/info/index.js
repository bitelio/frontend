'use strict';

import angular from 'angular';
import InfoController from './info.controller';

export default angular.module('bitelio.account.info', [])
  .controller('InfoController', InfoController)
  .name;
