import angular from 'angular';

class InitApp {

  constructor() {}

}
InitApp.$inject = [];

angular.module('app-module',[
  'LocalStorageModule',
  'app-templates'
]).run(InitApp);

