'use strict';

import angular from 'angular';
import AccountController from './account.controller';

export default angular.module('bitelio.user.account', [])
  .controller('AccountController', AccountController)
  .name;
