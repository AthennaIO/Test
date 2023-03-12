/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@japa/assert' {
  export interface Assert {
    throws(fn: () => any, errType: any, message?: string): void
    doesNotThrows(fn: () => any, errType: any, message?: string): void
    rejects(
      fn: () => any | Promise<any>,
      errType: any,
      message?: string,
    ): Promise<any>
    doesNotRejects(
      fn: () => any | Promise<any>,
      errType: any,
      message?: string,
    ): Promise<any>
  }
}

declare module '@japa/runner' {
  interface TestContext {
    assert: import('@japa/assert').Assert
  }
}

export * from './Helpers/Importer.js'
export * from './Helpers/ExitFaker.js'
export * from './Decorators/AfterAll.js'
export * from './Decorators/AfterEach.js'
export * from './Decorators/BeforeAll.js'
export * from './Decorators/BeforeEach.js'
export * from './Decorators/Cleanup.js'
export * from './Decorators/DisableTimeout.js'
export * from './Decorators/Fails.js'
export * from './Decorators/Pin.js'
export * from './Decorators/Retry.js'
export * from './Decorators/Setup.js'
export * from './Decorators/Skip.js'
export * from './Decorators/Tags.js'
export * from './Decorators/Teardown.js'
export * from './Decorators/Test.js'
export * from './Decorators/TestCase.js'
export * from './Decorators/Timeout.js'
export * from './Decorators/WaitForDone.js'
export * from './Types/TestOptions.js'
export * from './Types/TestContext.js'
