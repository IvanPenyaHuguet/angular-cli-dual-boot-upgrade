// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

// Then import the angularjs application and the angularjs test utilities.
import './ajs-main';
import 'angular-mocks';

// Then we find all the tests.
// import.meta.webpackContext with Angular >= 15, require.context otherwise with Angular < 15
const context = import.meta.webpackContext?.(
  './',
{ recursive: true, regExp: /\.spec\.ts$/ }
);
// And load the modules.
if(context) context.keys().map(context);
