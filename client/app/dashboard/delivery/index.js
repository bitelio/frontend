'use strict';

import angular from 'angular';
import DeliveryController from './delivery.controller';

export default angular.module('bitelio.dashboard.delivery', [])
  .controller('DeliveryController', DeliveryController)
  .name;
