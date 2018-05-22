'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    template: require('./main.pug'),
    url: '/',
    resolve: {
      user: User => User.get(),
      board: (user, Board) => Board
    }
  });
}
