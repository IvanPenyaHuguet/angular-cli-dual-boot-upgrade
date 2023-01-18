import * as angular from 'angular';
import { Type } from '@angular/core';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';


export type DowngradeComponentInfo = {
    component: Type<unknown>,
    inputs?: string[],
    outputs?: string[],
    propagateDigest?: boolean,
    downgradedModule?: string,
    selectors?: string[]
};


export const getAJSModule = (module: string, require?: string[]): angular.IModule => {
    try {
        return angular.module(module);
    } catch {
        return angular.module(module, require || []);
    }
};

/**
 * Function to downgrade an angular service to angularjs, and be able to inject it.
 * @param serviceName Name of the service in angularjs
 * @param service Angular service class
 * @param module Name of the angularjs module to be added
 * @param requireModule List of dependencies of the angularjs module
 * @author Iván Peña Huguet
 */
export const downgradeToAJSService = ( serviceName: string, service: Type<unknown>, module: string, requireModule?: string[]): void => {
    getAJSModule(module, requireModule).service(serviceName, downgradeInjectable(service));
};

/**
 * Function to downgrade an angular service to angularjs, and be able to inject it.
 * The componentInformation parameter receive an object with the angular component as component and additionally can have
 * inputs and outputs available in angularjs as string array.
 * @param componentName Name of the component in angularjs with camelCase syntax
 * @param componentInformation Angular component information object.
 * @param module Name of the angularjs module to be added
 * @param requireModule List of dependencies of the angularjs module
 * @author Iván Peña Huguet
 */
export const downgradeToAJSComponent = ( componentName: string, componentInformation: DowngradeComponentInfo, module: string, requireModule?: string[]): void => {
    getAJSModule(module, requireModule)
        .directive(componentName, downgradeComponent(
            {
                component: componentInformation.component,
                inputs: componentInformation.inputs,
                outputs: componentInformation.outputs,
                propagateDigest: componentInformation.propagateDigest,
                downgradedModule: componentInformation.downgradedModule,
                selectors: componentInformation.selectors
            }) as angular.IDirectiveFactory
        );
};

export const upgradeAJSServiceProvider = ( serviceName: string, serviceClass: unknown) => {
    function rootScopeFactory (i: any) {
        return i.get(serviceName);
    }
    return {
        provide: serviceClass,
        useFactory: rootScopeFactory,
        deps: ['$injector']
    };
};
