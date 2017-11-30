'use strict';

export default class LoginController {
  user = {
    username: '',
    password: '',
    email: ''
  };

  panel = 'login'
  message = 'activate your account'

  /*@ngInject*/
  constructor(Auth, $state, $stateParams, $timeout, notify) {
    this.Auth = Auth;
    this.$state = $state;
    this.notify = notify;
  }

  checkInput(input) {
    input.$setValidity('valid', true);
    input.hasError = input.$touched && input.$invalid
      ? 'has-error has-feedback'
      : null;
  }

  login(form) {
    this.Auth.login(this.user.username, this.user.password)
      .then(() => {
        this.$state.go('main');
      })
      .catch(err => {
        const typo = err.message.match(/username|password/);
        if(typo) form[typo[0]].hasError = 'has-error has-feedback';
        else this.notify.error(err);
      });
  }

  email() {
    this.Auth.requestPassword(this.user.email)
      .then(res => {
        this.user.name = res.data.name;
        this.message = res.data.action == 'recover'
          ? 'restore your password'
          : 'activate your account';
        this.panel = 'success';
      })
      .catch(err => {
        if(err.status == 404) this.panel = 'unauthorized';
        else this.notify.error(err);
      });
  }
}
