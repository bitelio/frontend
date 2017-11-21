'use strict';

export default class ResetController {
  password = {
    new: '',
    confirm: ''
  };

  /*@ngInject*/
  constructor(Auth, $state, $stateParams) {
    this.Auth = Auth;
    this.$state = $state;
    this.token = $stateParams.token;

    if(this.token.length != 16) {
      this.redirect('The link is invalid', 'danger');
    } else {
      var deadline = parseInt(this.token.slice(8), 16) * 1000;
      if(deadline < Date.now()) {
        this.redirect('The link has expired', 'danger');
      }
    }
  }

  redirect(text, type) {
    this.$state.go('login', {alert: {text, type}});
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
          this.$state.go('main', {alert: {
            text: 'Password changed successfully',
            type: 'success'
          }});
        })
        .catch(err => {
          var alert = {text: err.message, type: 'danger'};
          this.$state.go('login', {alert});
        });
    }
  }
}
