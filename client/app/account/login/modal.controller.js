'use strict';

export default class ModalController {
  email = 'user@example.org'
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
      .then(res => {
        this.alert.text = res.data.message;
        this.alert.type = 'success';
      })
      .catch(error => {
        this.alert.text = error.message;
        this.alert.type = 'danger';
      });
  }

  close() {
    this.$uibModalInstance.dismiss('close');
  }
}
