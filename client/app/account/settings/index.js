'use strict';

import angular from 'angular';
import UserController from './user.controller';

export default angular.module('bitelioApp.user', [])
  .controller('UserController', UserController)
  .name;
