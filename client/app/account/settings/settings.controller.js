'use strict';

export default class SettingsController {
  password = {
    current: '',
    new: '',
    confirm: ''
  };

  /*@ngInject*/
  constructor(Auth) {
    this.Auth = Auth;
  }

  hasError(input) {
    if(input.$touched && input.$invalid) return 'has-error';
  }

  checkPassword(form) {
    if(this.password.new && this.password.confirm) {
      var validity = this.password.new == this.password.confirm;
      form.confirmPassword.$setValidity('match', validity);
    }
  }

  changePassword(form) {
    this.Auth.changePassword(this.password.current, this.password.new)
      .then(() => {
        this.alert = {
          text: 'Password successfully changed',
          type: 'success'
        };
      })
      .catch(err => {
        if(err.status == 403) {
          this.alert = {};
          form.currentPassword.$setValidity('auth', false);
        } else {
          this.alert = {
            text: 'Something went wrong',
            type: 'danger'
          };
        }
      });
  }
}
