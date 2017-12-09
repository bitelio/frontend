'use strict';

import angular from 'angular';
import {UserService} from './user.service';

export default angular.module('bitelio.components.user', [])
  .service('User', UserService)
  .name;
