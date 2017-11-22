'use strict';

export default class UserController {
  /*@ngInject*/
  constructor($rootScope) {
    this.boards = $rootScope.Boards;
  }
}
