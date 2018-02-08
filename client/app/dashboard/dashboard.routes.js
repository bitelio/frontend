'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('dashboard', {
      url: 'dashboard',
      parent: 'main',
      template: require('./dashboard.pug'),
      abstract: true
    })
    .state('dashboard.delivery', {
      url: '/delivery',
      template: require('./delivery/delivery.pug'),
      controller: 'DeliveryController',
      controllerAs: 'vm',
      authenticate: true
    });
}
