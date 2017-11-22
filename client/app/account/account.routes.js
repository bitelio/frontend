'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login',
      params: {
        alert: {
          text: '',
          type: ''
        }
      },
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
    .state('user', {
      url: 'user',
      parent: 'main',
      template: require('./user/user.pug'),
      controller: 'UserController',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('settings', {
      url: 'settings',
      parent: 'main',
      template: require('./settings/settings.pug'),
      controller: 'UserController',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('reset', {
      url: '/reset/{token}',
      template: require('./reset/reset.pug'),
      controller: 'ResetController',
      controllerAs: 'vm'
    });
}
