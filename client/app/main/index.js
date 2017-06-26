import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export default angular.module('bitelioApp.main', [uiRouter])
  .config(routing)
  .name;
