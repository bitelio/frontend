'use strict';
/* eslint no-sync: 0 */

export default class NotificationsComponent {
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
