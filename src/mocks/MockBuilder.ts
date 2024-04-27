/**
 * @athenna/test
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Mock, type Stub } from '#src'
import type { SinonSandbox } from 'sinon'
import { type Exception } from '@athenna/common'

export class MockBuilder {
  /**
   * Holds sinon stub instance.
   */
  private stub: Stub

  /**
   * Holds the sinon sandbox instance.
   */
  private sandbox: SinonSandbox

  public constructor(
    sandbox: SinonSandbox,
    object: any,
    method: any,
    stub?: Stub
  ) {
    if (stub) {
      this.stub = stub

      return
    }

    this.sandbox = sandbox

    this.stub = this.sandbox.stub(object, method).callsFake((...args) => {
      return this.stub.wrappedMethod.bind(object)(...args)
    })
  }

  /**
   * Returns the sinon stub instance.
   */
  public get() {
    return this.stub
  }

  /**
   * Mock the method only for the provided arguments.
   * This is useful to be more expressive in your
   * assertions, where you can access the spy with
   * the same call. It is also useful to create a
   * stub that can act differently in response to
   * different arguments.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withArgs('Hello').returns(10)
   *
   * const value = console.log('Hello')
   *
   * console.log(value) // 10
   * ```
   */
  public withArgs(...args: any[]) {
    return new MockBuilder(null, null, null, this.stub.withArgs(...args))
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid string.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withStringArg().returns(10)
   *
   * const value = console.log('Hello')
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.string)...
   * ```
   */
  public withStringArg() {
    return this.withArgs(Mock.match.string)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid number.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withNumberArg().returns(10)
   *
   * const value = console.log(10)
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.number)...
   * ```
   */
  public withNumberArg() {
    return this.withArgs(Mock.match.number)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid array.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withArrayArg().returns(10)
   *
   * const value = console.log([10])
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.array)...
   * ```
   */
  public withArrayArg() {
    return this.withArgs(Mock.match.array)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid array.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withObjectArg().returns(10)
   *
   * const value = console.log({})
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.object)...
   * ```
   */
  public withObjectArg() {
    return this.withArgs(Mock.match.object)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid boolean.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withBooleanArg().returns(10)
   *
   * const value = console.log(false)
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.bool)...
   * ```
   */
  public withBooleanArg() {
    return this.withArgs(Mock.match.bool)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid function.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withFunctionArg().returns(10)
   *
   * const value = console.log(() => {})
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.function)...
   * ```
   */
  public withFunctionArg() {
    return this.withArgs(Mock.match.func)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid date.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withDateArg().returns(10)
   *
   * const value = console.log(new Date())
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.date)...
   * ```
   */
  public withDateArg() {
    return this.withArgs(Mock.match.date)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid regex.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withRegexpArg().returns(10)
   *
   * const value = console.log(new RegExp())
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.regexp)...
   * ```
   */
  public withRegexpArg() {
    return this.withArgs(Mock.match.regexp)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid falsy.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withFalsyArg().returns(10)
   *
   * const value = console.log('')
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.falsy)...
   * ```
   */
  public withFalsyArg() {
    return this.withArgs(Mock.match.falsy)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument that is a valid falsy.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withTruthyArg().returns(10)
   *
   * const value = console.log('')
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.truthy)...
   * ```
   */
  public withTruthyArg() {
    return this.withArgs(Mock.match.truthy)
  }

  /**
   * Same as `withArgs()` method, but match
   * any argument.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').withAnyArg().returns(10)
   *
   * const value = console.log('')
   *
   * console.log(value) // 10
   * ```
   *
   * * This method is an alias for:
   *
   * @example
   * ```ts
   * Mock.when(console, 'log').withArgs(Mock.match.any)...
   * ```
   */
  public withAnyArg() {
    return this.withArgs(Mock.match.any)
  }

  /**
   * Defines the behavior of the stub on the nth
   * call. Useful for testing sequential interactions.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').onCall(3).returns(10)
   *
   * console.log('Hello')
   * console.log('Hello')
   * const value = console.log('Hello')
   *
   * console.log(value) // 10
   * ```
   */
  public onCall(number: number) {
    return new MockBuilder(null, null, null, this.stub.onCall(number - 1))
  }

  /**
   * Defines the behavior of the stub on the first
   * call. Useful for testing sequential interactions.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').onFirstCall().returns(10)
   *
   * const value = console.log('Hello')
   *
   * console.log(value) // 10
   * ```
   */
  public onFirstCall() {
    return this.onCall(1)
  }

  /**
   * Defines the behavior of the stub on the second
   * call. Useful for testing sequential interactions.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').onSecondCall().returns(10)
   *
   * console.log('Hello')
   * const value = console.log('Hello')
   *
   * console.log(value) // 10
   * ```
   */
  public onSecondCall() {
    return this.onCall(2)
  }

  /**
   * Defines the behavior of the stub on the third
   * call. Useful for testing sequential interactions.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * Mock.when(console, 'log').onSecondCall().returns(10)
   *
   * console.log('Hello')
   * console.log('Hello')
   * const value = console.log('Hello')
   *
   * console.log(value) // 10
   * ```
   */
  public onThirdCall() {
    return this.onCall(3)
  }

  /**
   * Mock a property making it return
   * it own `this` property.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').returnThis().get()
   *
   * if (mock() === console) {
   *   return
   * }
   * ```
   */
  public returnThis() {
    this.stub = this.stub.returnsThis()

    return this
  }

  /**
   * Mock a property changing it value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').value(() => {}).get()
   *
   * mock.called // false
   * ```
   */
  public value(value: any) {
    this.stub = this.stub.value(value)

    return this
  }

  /**
   * Mock the method to return the given value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').return('Hello World').get()
   *
   * mock.called // false
   * ```
   */
  public return(value: any) {
    this.stub = this.stub.returns(value)

    return this
  }

  /**
   * Mock the method to throw the given value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').throw('Hello World')
   *
   * mock.called // false
   * ```
   */
  public throw(value: string | Error | Exception): MockBuilder {
    this.stub = this.stub.throws(value)

    return this
  }

  /**
   * Mock the method to resolve returning the given value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').resolve('Hello World').get()
   *
   * mock.called // false
   * ```
   */
  public resolve(value: any) {
    this.stub = this.stub.resolves(value)

    return this
  }

  /**
   * Mock the method to reject returning the given value.
   *
   * @example
   * ```ts
   * import { Mock } from '@athenna/test'
   *
   * const mock = Mock.when(console, 'log').reject('Hello World').get()
   *
   * mock.called // false
   * ```
   */
  public reject<T = any>(value: T): MockBuilder {
    this.stub = this.stub.rejects(value)

    return this
  }
}
