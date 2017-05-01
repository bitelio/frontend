'use strict';

export function routeConfig($urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');
}
