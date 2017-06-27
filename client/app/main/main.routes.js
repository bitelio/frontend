'use strict';

import _ from 'lodash';


export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: require('./main.pug'),
    authenticate: true,
    resolve: {user: ($rootScope, User) => User.get().$promise},
    controller: ($rootScope, user) => {
      const BoardId = user.Board || user.Boards[0].BoardId;
      $rootScope.User = _.omit(user, 'Boards');
      $rootScope.Board = _.find(user.Boards, {BoardId: BoardId});
      $rootScope.Boards = _.filter(user.Boards, o => o.BoardId != BoardId);
    }
  });
}
