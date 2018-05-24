'use strict';

export default class UserService {
  constructor($http, $q, $cookies, $state, notify) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
    this.$cookies = $cookies;
    this.$state = $state;
    this.notify = notify;
    this.keys = [];
  }

  get() {
    return this.$http.get('/api/user')
      .then(res => {
        Object.assign(this, res.data);
        this.fields = Object.keys(res.data);
        return res.data;
      })
      .catch(err => {
        this.notify.error(err.data);
        this.clear();
        return this.$q.reject(err.data);
      });
  }

  clear() {
    this.keys.forEach(key => Reflect.delete(this[key]));
  }

  update(data) {
    return this.$http.post('/api/user', data);
  }

  delete() {
    return this.$http.delete('/api/user')
      .then(() => {
        this.$cookies.remove('token');
        this.clear();
        this.notify.success('Your account has been deleted');
        this.$state.go('login');
      })
      .catch(err => {
        this.notify.error(err.data);
      });
  }
}
