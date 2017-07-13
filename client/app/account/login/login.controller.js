'use strict';

export default class LoginController {
  user = {
    username: '',
    password: ''
  };

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  checkInput(input) {
    input.$setValidity('valid', true);
    input.hasError = input.$touched && input.$invalid
      ? 'has-error has-feedback'
      : null;
  }

  login(form) {
    if(form.$valid) {
      this.Auth.login({
        username: this.user.username,
        password: this.user.password
      }).then(() => {
        this.$state.go('main');
      })
        .catch(err => {
          if(err.message.indexOf('username') > 0) {
            form.username.hasError = 'has-error has-feedback';
          } else if(err.message.indexOf('password') > 0) {
            form.password.hasError = 'has-error has-feedback';
          } else {
            this.alert = err.message;
          }
        });
    }
  }
}
