'use strict';

import angular from 'angular';
import SettingsController from './locale.controller';

export default angular.module('bitelio.locale', [])
  .controller('SettingsController', SettingsController)
  .name;
