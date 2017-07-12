'use strict';

export default class LoginController {
  user = {
    username: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  show = 'password';

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  toggle() {
    this.show = this.show == 'text' ? 'password' : 'text';
  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        username: this.user.username,
        password: this.user.password
      }).then(() => {
        this.$state.go('main');
      })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}
