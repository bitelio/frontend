import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export default angular.module('bitelio.main', [uiRouter])
  .config(routing)
  .name;
