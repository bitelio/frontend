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
    .state('board.locale', {
      url: '/locale',
      template: require('./locale/locale.pug'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
