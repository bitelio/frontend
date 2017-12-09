'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';
import NotificationsService from './notifications.service';
import NotificationsComponent from './notifications.component';

export default angular.module('bitelio.components.notifications', [])
  .service('notify', NotificationsService)
  .component('notifications', {
    template: require('./notifications.pug'),
    controller: NotificationsComponent
  })
  .name;
