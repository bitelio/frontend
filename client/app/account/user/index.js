'use strict';

import angular from 'angular';
import UserController from './user.controller';

export default angular.module('bitelio.account.user', [])
  .controller('UserController', UserController)
  .name;
