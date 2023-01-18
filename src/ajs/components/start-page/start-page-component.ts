import * as angular from 'angular';



class StartPageComponent implements angular.IController {

    constructor () {}

}

const selector = 'startPage';
const options = {
    bindings: {},
    controller: StartPageComponent,
    controllerAs: 'ctrl',
    templateUrl: 'templates/start-page-view.html'
};

const inject: string[] = [];

const mod = angular.module('components-module', []);
options.controller.$inject = inject;
mod.component(selector, options);
