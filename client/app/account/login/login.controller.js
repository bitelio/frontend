'use strict';

export default class LoginController {
  user = {
    username: '',
    password: '',
    email: ''
  };

  panel = 'login'

  /*@ngInject*/
  constructor(Auth, $state, $uibModal, $stateParams) {
    this.Auth = Auth;
    this.$state = $state;
    this.animate = $stateParams.animate;
    this.alert = $stateParams.alert;
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
        var typo = err.message.match(/username|password/);
        if(typo) form[typo[0]].hasError = 'has-error has-feedback';
        else this.alert = {text: err.message, type: 'danger'};
      });
  }

  signup() {
    this.Auth.requestPassword(this.user.email)
      .then(res => {
        this.panel = res.data.action;
        this.user.name = res.data.name;
      })
      .catch(err => {
        if(err.status == 404) {
          this.panel = 'unauthorized';
        } else {
          this.alert = {text: err.message, type: 'danger'};
        }
      });
  }
}
