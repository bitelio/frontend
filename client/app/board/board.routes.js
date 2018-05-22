'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('board', {
      url: 'board',
      parent: 'main',
      template: '<ui-view/>',
      abstract: true
    })
    .state('board.status', {
      url: '/status',
      template: require('./status/status.pug'),
      controller: 'StatusController',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('board.locale', {
      url: '/locale',
      template: require('./locale/locale.pug'),
      controller: 'LocaleController',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('board.stations', {
      url: '/stations',
      template: require('./stations/stations.pug'),
      controller: 'StationsController',
      controllerAs: 'vm',
      authenticate: true,
      resolve: {
        lanes: board => board.get('/lanes'),
        stations: board => board.get('/stations')
      }
    });
}
