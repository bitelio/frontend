'use strict';

export default class ModalController {
  email = ''
  alert = {
    text: 'We\'re in Beta! Access is currently limited to selected Kanban users',
    type: 'warning'
  }

  /*@ngInject*/
  constructor(Auth, $uibModalInstance) {
    this.Auth = Auth;
    this.$uibModalInstance = $uibModalInstance;
  }

  submit() {
    this.Auth.requestPassword(this.email)
      .then(() => {
        this.alert.type = 'Check your inbox!';
        this.alert.type = 'success';
      })
      .catch(error => {
        this.text = error.message;
        this.type = 'danger';
      });
  }

  close() {
    this.$uibModalInstance.dismiss('close');
  }
}
