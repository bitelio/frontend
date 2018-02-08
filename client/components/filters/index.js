'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export default angular.module('bitelio.components.filters', [])
  .component('filters', {
    template: require('./filters.pug'),
    controller: class FiltersComponent {
      collapsed = true
    }
  })
  .name;
