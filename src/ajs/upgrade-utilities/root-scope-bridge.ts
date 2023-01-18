import { InjectionToken } from '@angular/core';

/**
 * Angular compatible injetable token for the angularjs rootScope service
 */
export const RootScope = new InjectionToken('$rootScope');

export function rootScopeFactory (i: any) {
    return i.get('$rootScope');
}

/**
 * Provider for the app module to inject the $rootScope service
 */
export const RootScopeProvider = {
    provide: RootScope,
    useFactory: rootScopeFactory,
    deps: ['$injector']
};
