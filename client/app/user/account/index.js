'use strict';

import angular from 'angular';
import AccountController from './account.controller';
import DeleteModalController from './delete.modal.controller';

export default angular.module('bitelio.user.account', [])
  .controller('AccountController', AccountController)
  .controller('DeleteModalController', DeleteModalController)
  .name;
