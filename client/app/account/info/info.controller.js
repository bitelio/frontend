'use strict';

export default class InfoController {
  password = {
    current: '',
    new: '',
    confirm: ''
  };

  /*@ngInject*/
  constructor(Auth, User, Board, notify) {
    this.User = User;
    this.Board = Board;
    this.Auth = Auth;
    this.notify = notify;
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

  changePassword(form) {
    this.Auth.changePassword(this.password.current, this.password.new)
      .then(() => {
        this.notify.success('Password changed successfully');
      })
      .catch(err => {
        if(err.status == 403) {
          form.currentPassword.$setValidity('auth', false);
        } else {
          this.notify.error(err);
        }
      });
  }
}
