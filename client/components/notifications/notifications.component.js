'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';
import NotificationsService from './notifications.service';

class NotificationsComponent {
  constructor(notify) {
    'ngInject';

    this.notifications = notify;
  }

  icons = {
    info: 'info',
    success: 'check',
    warning: 'exclamation',
    danger: 'times'
  };
}

export default angular.module('components.notifications', [])
  .service('notify', NotificationsService)
  .component('notifications', {
    template: require('./notifications.pug'),
    controller: NotificationsComponent
  })
  .name;
