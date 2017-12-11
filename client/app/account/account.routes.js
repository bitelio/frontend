'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('account', {
      url: 'account',
      parent: 'main',
      template: '<ui-view/>',
      abstract: true
    })
    .state('account.info', {
      url: '/info',
      parent: 'account',
      template: require('./info/info.pug'),
      controller: 'InfoController',
      controllerAs: 'vm',
    })
    .state('account.settings', {
      url: '/settings',
      parent: 'account',
      template: require('./settings/settings.pug'),
      controller: 'SettingsController',
      controllerAs: 'vm',
    });
}
