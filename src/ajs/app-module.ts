import angular from 'angular';

class InitApp {

  constructor() {}

}
InitApp.$inject = [];

angular.module('app',[
  'LocalStorageModule',
  'app-templates'
]).run(InitApp);

