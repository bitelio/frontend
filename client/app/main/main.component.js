import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor(Auth, Kanban) {
    this.Auth = Auth;
    this.Kanban = Kanban;
    this.user = this.Auth.getCurrentUserSync();
  }

  $onInit() {
  }
}

export default angular.module('bitelioApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .name;
