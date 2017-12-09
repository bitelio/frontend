'use strict';
/* eslint no-sync: 0 */

import _ from 'lodash';

export default class NotificationsService {
  constructor($timeout) {
    'ngInject';

    this.$timeout = $timeout;
  }

  counter = 1;
  messages = [];

  info(message, title, callback) {
    this.show({message, title, type: 'info', callback});
  }

  success(message, title, callback) {
    this.show({message, title, type: 'success', callback});
  }

  warning(message, title, callback) {
    this.show({message, title, type: 'warning', callback});
  }

  danger(message, title, callback) {
    this.show({message, title, type: 'danger', callback});
  }

  error(err) {
    this.show({
      message: err.message,
      title: `${err.status || 500} error`,
      type: 'danger'
    });
  }

  show(message) {
    message.id = this.counter++;
    this.messages.push(message);
    if(this.messages.length > 5) {
      this.messages.shift();
    } else {
      this.$timeout(() => {
        message.hide = true;
        this.hide();
      }, 4000);
    }
  }

  hide(id) {
    if(id) {
      this.messages = this.messages.filter(m => m.id != id);
    } else {
      this.messages = this.messages.filter(m => !m.hide || m.hold);
    }
  }

  hold(id) {
    const message = _.find(this.messages, m => m.id === id);
    message.hold = !message.hold;
    this.hide();
  }
}
