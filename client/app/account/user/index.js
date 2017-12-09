'use strict';

import angular from 'angular';
import UserController from './user.controller';

export default angular.module('bitelio.user', [])
  .controller('UserController', UserController)
  .name;
