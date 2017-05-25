'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Dashboard',
    state: 'main'
  }];

  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.user = Auth.getCurrentUserSync();
    this.currentBoard = {Title: 'Test'};
    this.availableBoards = [{Title: 'Testing 5342'}];
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
