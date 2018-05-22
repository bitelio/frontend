'use strict';

export default function routeConfig($urlRouterProvider, $locationProvider, $httpProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  $httpProvider.defaults.cache = true;
}
