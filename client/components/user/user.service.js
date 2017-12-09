'use strict';

export class UserService {
  constructor($http, $q) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
  }

  get() {
    return this.$http.get('/api/user')
      .then(res => {
        Object.assign(this, res.data);
        return res.data;
      })
      .catch(err => {
        this.clear();
        return this.$q.reject(err.data);
      });
  }

  clear() {
    for(let attr in this) {
      if(typeof this[attr] != 'function') {
        this[attr] = undefined;
      }
    }
  }

  password(oldPassword, newPassword) {
    return this.$http.put('/api/user/password', {oldPassword, newPassword});
  }
}
