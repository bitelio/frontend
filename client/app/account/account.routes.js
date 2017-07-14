'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login',
      template: require('./login/login.pug'),
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('logout', {
      url: '/logout',
      template: '',
      controller($state, Auth) {
        'ngInject';

        Auth.logout();
        $state.go('login');
      }
    })
    .state('settings', {
      url: 'settings',
      parent: 'main',
      template: require('./settings/settings.pug'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
