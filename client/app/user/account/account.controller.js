'use strict';

export default class AccountController {
  login = new Date().toString();
  password = {
    first: '',
    second: ''
  };
  subscriptions = {
    updates: false,
    alerts: false
  }
  locales = {
    de: {
      name: 'German',
      date: 'dd.mm.yyyy',
      separator: '0,123'
    },
    en: {
      name: 'English',
      date: 'mm.dd.yyyy',
      separator: '0.123'
    }
  }

  /*@ngInject*/
  constructor($templateCache, $uibModal, User, notify) {
    this.$uibModal = $uibModal;
    this.User = User;
    this.notify = notify;
    $templateCache.put('delete-modal', require('./delete.modal.pug'));
  }

  hasError(input) {
    if(input.$touched && input.$invalid) {
      return 'has-error has-feedback';
    }
  }

  toggleSigned() {
    this.User.Signed = !this.User.Signed;
    this.User.update({Signed: this.User.signed});
  }

  checkPassword(form) {
    if(this.password.first && this.password.second) {
      var validity = this.password.first === this.password.second;
      form.secondPassword.$setValidity('match', validity);
    }
  }

  changePassword() {
    this.User.update({Password: this.password.first})
      .then(() => this.notify.success('Password changed successfully'))
      .catch(err => this.notify.error(err));
  }

  confirmDeletion() {
    const modalInstance = this.$uibModal.open({
      templateUrl: 'delete-modal',
      controller: 'DeleteModalController',
      controllerAs: '$ctrl'
    });

    modalInstance.result.then(() => this.User.delete());
  }
}
