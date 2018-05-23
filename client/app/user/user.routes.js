'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('user', {
      url: 'user',
      parent: 'main',
      template: '<ui-view/>',
      abstract: true
    })
    .state('user.profile', {
      url: '/profile',
      parent: 'user',
      template: require('./profile/profile.pug'),
      controller: 'ProfileController',
      controllerAs: 'vm',
    })
    .state('user.account', {
      url: '/account',
      parent: 'user',
      template: require('./account/account.pug'),
      controller: 'AccountController',
      controllerAs: 'vm',
    });
}
