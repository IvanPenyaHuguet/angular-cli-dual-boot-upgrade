import angular from 'angular';

class InitApp {

  constructor() {}

}
InitApp.$inject = [];

angular.module('app-module',[
  'LocalStorageModule',
  'app-templates',
  'components-module'
]).run(InitApp);

