'use strict';

import _ from 'lodash';

export default class BoardService {
  constructor($http, $cookies, $rootScope, notify, User) {
    'ngInject';

    this.$http = $http;
    this.$cookies = $cookies;
    this.$rootScope = $rootScope;
    this.notify = notify;
    this.Boards = User.Boards;
    this.change($cookies.get('BoardId'));
  }

  get(endpoint = '') {
    return this.$http({
      method: 'POST',
      url: `/api/board${endpoint}`,
      cache: true,
      data: {BoardId: this.BoardId}
    })
      .then(res => res.data)
      .catch(err => {
        this.notify.error(err.data);
        return {};
      });
  }

  get Lanes() {
    return this.get('/lanes');
  }

  get Stations() {
    return this.get('/stations');
  }

  get CardTypes() {
    return this.get().CardTypes;
  }

  get ClassesOfService() {
    return this.get().ClassesOfService;
  }

  get Settings() {
    return this.get('/settings');
  }

  change(BoardId) {
    const board = _.find(this.Boards, {BoardId});
    Object.assign(this, board || this.Boards[0]);
    this.$cookies.put('BoardId', this.BoardId);
    this.$rootScope.$broadcast('board changed');
  }
}
