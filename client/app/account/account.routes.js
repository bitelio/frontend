'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('main.user', {
      url: 'user',
      template: require('./user/user.pug'),
      controller: 'UserController',
      controllerAs: 'vm',
    });
}
