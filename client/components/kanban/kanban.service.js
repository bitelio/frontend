'use strict';

import _ from 'lodash';


class _Board {
  Id = '';
  Title = '';
}

export function KanbanService($cookies, Auth, Util) {
  'ngInject';

  var safeCb = Util.safeCb;

  var currentBoard = new _Board;
  var user = Auth.getCurrentUser(user => {
    var currentBoardId = $cookies.get('board');
    var currentBoard = _.find(user.Boards, board => board.Id == currentBoardId);
    if(!currentBoard) {
      currentBoard = user.Boards[0];
    }
    console.log(currentBoard);
  });

  var Kanban = {
    board: currentBoard,
    user: user
  };

  return Kanban;
}
