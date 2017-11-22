'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('configuration', {
      url: 'configuration',
      parent: 'main',
      template: require('./settings/settings.pug'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
