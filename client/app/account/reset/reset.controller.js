'use strict';

export default class ResetController {
  password = {
    new: '',
    confirm: ''
  };

  /*@ngInject*/
  constructor(Auth, $state, $stateParams, notify) {
    this.Auth = Auth;
    this.$state = $state;
    this.token = $stateParams.token;
    this.notify = notify;

    if(this.token.length != 16) {
      notify.danger('The link is invalid');
      $state.go('login');
    } else {
      var deadline = parseInt(this.token.slice(8), 16) * 1000;
      if(deadline < Date.now()) {
        notify.danger('The link has expired');
        $state.go('login');
      }
    }
  }

  hasError(input) {
    if(input.$touched && input.$invalid) {
      return 'has-error has-feedback';
    }
  }

  checkPassword(form) {
    if(this.password.new && this.password.confirm) {
      var validity = this.password.new == this.password.confirm;
      form.confirmPassword.$setValidity('match', validity);
    }
  }

  resetPassword(form) {
    if(form.$valid) {
      this.Auth.resetPassword(this.password.new, this.token)
        .then(() => {
          this.notify.error('Password changed successfully');
          this.$state.go('main');
        })
        .catch(err => {
          this.notify.error(err);
          this.$state.go('login');
        });
    }
  }
}
