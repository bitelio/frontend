'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export default angular.module('bitelio.components.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: class NavbarComponent {
      collapsed = true
    }
  })
  .name;
