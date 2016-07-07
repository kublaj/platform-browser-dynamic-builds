/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompilerConfig, DirectiveResolver, ViewResolver } from '@angular/compiler';
import { MockDirectiveResolver, MockViewResolver, OverridingTestComponentBuilder } from '@angular/compiler/testing';
import { AppModule, Compiler, ReflectiveInjector } from '@angular/core';
import { TestComponentBuilder, TestComponentRenderer } from '@angular/core/testing';
import { BrowserTestModule, browserTestPlatform } from '@angular/platform-browser/testing';
import { BROWSER_APP_COMPILER_PROVIDERS } from './index';
import { DOMTestComponentRenderer } from './testing/dom_test_component_renderer';
export * from './private_export_testing';
const TEST_BROWSER_DYNAMIC_COMPILER_PROVIDERS = [
    BROWSER_APP_COMPILER_PROVIDERS,
    [
        { provide: DirectiveResolver,
            useClass: MockDirectiveResolver },
        { provide: ViewResolver,
            useClass: MockViewResolver }
    ]
];
/**
 * Creates a compiler for testing
 *
 * @stable
 */
export function browserTestCompiler({ providers = [], useJit = true } = {}) {
    const injector = ReflectiveInjector.resolveAndCreate([
        TEST_BROWSER_DYNAMIC_COMPILER_PROVIDERS,
        { provide: CompilerConfig, useValue: new CompilerConfig({ genDebugInfo: true, useJit: useJit }) },
        providers ? providers : []
    ]);
    return injector.get(Compiler);
}
/**
 * Platform for testing.
 *
 * @experimental API related to bootstrapping are still under review.
 */
export const browserDynamicTestPlatform = browserTestPlatform;
export class BrowserDynamicTestModule {
}
/** @nocollapse */
BrowserDynamicTestModule.decorators = [
    { type: AppModule, args: [{
                modules: [BrowserTestModule],
                providers: [
                    { provide: TestComponentBuilder, useClass: OverridingTestComponentBuilder },
                    { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer },
                ]
            },] },
];
//# sourceMappingURL=testing.js.map