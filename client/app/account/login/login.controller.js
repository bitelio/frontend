'use strict';

import ModalController from './modal.controller';

export default class LoginController {
  user = {
    username: '',
    password: ''
  };

  /*@ngInject*/
  constructor(Auth, Util, $state, $uibModal, $stateParams) {
    this.Auth = Auth;
    this.Util = Util;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.alert = $stateParams.alert;
  }

  checkInput(input) {
    input.$setValidity('valid', true);
    input.hasError = input.$touched && input.$invalid
      ? 'has-error has-feedback'
      : null;
  }

  showHelp() {
    var modalInstance = this.$uibModal.open({
      template: require('./modal.pug'),
      controller: ModalController,
      controllerAs: 'vm',
      size: 'md'
    });

    modalInstance.result.then(this.Util.safeCb, this.Util.safeCb);
  }

  login(form) {
    if(form.$valid) {
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
  }
}
