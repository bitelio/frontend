'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';
import NavbarComponent from './navbar.component';

export default angular.module('bitelio.components.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
