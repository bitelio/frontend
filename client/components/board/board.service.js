'use strict';

import _ from 'lodash';

export default class BoardService {
  constructor($http, $cookies, $state, $cacheFactory, notify, User) {
    'ngInject';

    this.$http = $http;
    this.$cookies = $cookies;
    this.$state = $state;
    this.cache = $cacheFactory.get('$http');
    this.notify = notify;
    this.Boards = User.Boards;
    if(this.Boards) this.load($cookies.get('BoardId'));
  }

  get(endpoint = '') {
    return this.$http.get(`/api/${this.Id}${endpoint}`)
      .then(res => res.data)
      .catch(err => {
        this.notify.error(err.data);
        return [];
      });
  }

  post(endpoint, data) {
    const url = `/api/${this.Id}${endpoint}`;
    return this.$http({method: 'POST', url, data})
      .then(res => {
        this.cache.put(url, data);
        const name = endpoint.charAt(1).toUpperCase() + endpoint.slice(2);
        const items = name.replace('_', ' ');
        this.notify.success(`${items} saved successfully`);
        return res.data;
      });
  }

  load(BoardId) {
    const board = _.find(this.Boards, {Id: parseInt(BoardId, 10)});
    if(board) {
      Object.assign(this, board);
      this.$cookies.put('BoardId', BoardId);
      this.AvailableBoards = _.filter(this.Boards, b => b.Id != this.Id);
    } else {
      this.load(this.Boards[0].Id);
    }
  }

  change(BoardId) {
    this.load(BoardId);
    this.cache.removeAll();
    this.$state.go('main', {}, {reload: true});
  }
}
