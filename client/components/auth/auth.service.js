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

  login(UserName, Password) {
    return this.$http.post('/api/login', {UserName, Password})
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

  request(UserName) {
    return this.$http.post('/api/help', {UserName});
  }

  reset(Password, Token) {
    return this.$http.post('/api/password', {Password, Token})
      .then(res => this.$cookies.put('token', res.data.token));
  }
}
