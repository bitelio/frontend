'use strict';

export default class AuthService {
  constructor($http, $cookies, $q, User) {
    'ngInject';

    this.$http = $http;
    this.$cookies = $cookies;
    this.$q = $q;
    this.User = User;
    this.ready = $cookies.get('token');
  }

  login(username, password) {
    return this.$http.post('/api/auth', {username, password})
      .then(res => {
        this.$cookies.put('token', res.data.token);
        this.ready = true;
      })
      .catch(err => {
        this.logout();
        return this.$q.reject(err.data);
      });
  }

  logout() {
    this.$cookies.remove('token');
    this.ready = false;
    this.User.clear();
  }

  request(email) {
    return this.$http.post('/api/auth/request', {email});
  }

  reset(password, token) {
    return this.$http.put('/api/auth/reset', {password, token});
  }
}
