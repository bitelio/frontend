'use strict';

export default class UserService {
  constructor($http, $q, notify) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
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

  password(oldPassword, newPassword) {
    return this.$http.put('/api/user/password', {oldPassword, newPassword});
  }
}
