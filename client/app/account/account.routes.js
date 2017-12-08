'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login',
      public: true,
      template: require('./login/login.pug'),
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('logout', {
      url: '/logout',
      public: true,
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
    })
    .state('reset', {
      url: '/reset/{token}',
      public: true,
      template: require('./reset/reset.pug'),
      controller: 'ResetController',
      controllerAs: 'vm'
    });
}
