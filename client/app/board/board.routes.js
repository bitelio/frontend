'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('settings', {
      url: 'settings',
      parent: 'main',
      template: require('./settings/settings.pug'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
