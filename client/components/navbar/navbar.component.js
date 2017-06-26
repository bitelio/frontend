'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  isCollapsed = true;

  constructor(Auth) {
    'ngInject';
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
