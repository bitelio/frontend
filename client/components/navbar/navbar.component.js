'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  isCollapsed = true;

  constructor() {
    'ngInject';
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
