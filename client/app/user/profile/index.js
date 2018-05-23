'use strict';

import angular from 'angular';
import ProfileController from './profile.controller';

export default angular.module('bitelio.user.profile', [])
  .controller('ProfileController', ProfileController)
  .name;
